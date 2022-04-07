import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose'
import { UsersRepository } from './users.repositoy';
import { IUser } from './interface/users.interfaces';
import { UserDocument } from './schema/users.schema';
import { Model } from 'mongoose'
import { ParseService } from '../../shared/services/parse.service';
import { USER_TYPE } from './schema/user.type.enum';
import { CommonService } from '../../shared/services/common.service';



@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => ParseService))
    private readonly parseService: ParseService,
    private readonly commonService: CommonService,
  ) { }

  async findOneById(
    _id: mongoose.Types.ObjectId)
    : Promise<IUser> {
    const found = await this.usersRepository.findOne(_id);
    if (!found) {
      throw new NotFoundException(`User Not Found.`)
    }
    return found
  }

  getModelInstance(): Model<UserDocument> {
    return this.usersRepository.getModelInstance()
  }

  async create(
    createUserDto: CreateUserDto)
    : Promise<IUser> {
    const { email, userType } = createUserDto;
    const foundUser = await this.usersRepository.findOneByEmial(email)
    if (foundUser) {
      return foundUser
    }

    if (!userType) {
      throw new BadRequestException(`userType required field.`)
    }
    createUserDto.type = this.getUserTypeEnum(userType)

    return this.usersRepository.create(createUserDto)
  }

  async findAll()
    : Promise<IUser[]> {
    return this.usersRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<IUser> {
    return this.usersRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto)
    : Promise<IUser> {
    await this.findOneById(_id)
    return this.usersRepository.update(_id, updateUserDto);
  }

  async remove(
    _id: mongoose.Types.ObjectId
  )
    : Promise<void> {
    await this.findOneById(_id)
    return this.usersRepository.deleteOne(_id);
  }

  async handleUpload(file) {
    return this.parseService.parseTransform(file)
  }

  getUserTypeEnum(type: string): USER_TYPE {
    const typeStr = type
      .match(/[a-zA-Z]+/g)
      .join()
      .toLowerCase()
    // replace , chars
    const cleanType = this.commonService
      .replaceAll(typeStr, ',', '')
    let compVal: string;

    for (const value of Object.values(USER_TYPE)) {
      compVal = this.commonService
        .replaceAll(value, '_', '')
        .toLocaleLowerCase();
      if (compVal === cleanType) {
        return USER_TYPE[value];
      }
    }
    throw new BadRequestException(`User Type Not Found.`)
  }

}
