import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose'
import { UsersRepository } from './users.repositoy';
import { IUser } from './interface/users.interfaces';
import { UserDocument } from './schema/users.schema';
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  getModelInstance(): Model<UserDocument> {
    return this.usersRepository.getModelInstance()
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto)
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<IUser> {
    return this.usersRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(_id, updateUserDto);
  }

  async remove(_id: mongoose.Types.ObjectId) {
    return this.usersRepository.deleteOne(_id);
  }
}
