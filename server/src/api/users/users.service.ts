import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose'
import { UsersRepository } from './users.repositoy';
import { IUser } from './interface/users.interfaces';
import { UserDocument } from './schema/users.schema';
import { Model } from 'mongoose'
import { ParseService } from '../../shared/services/parse.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => ParseService))
    private readonly parseService: ParseService,


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
    await this.parseService.parseTransform(file)
  }

}
