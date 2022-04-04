import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUser } from "./interface/users.interfaces";
import { UserDocument } from "./schema/users.schema";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>
  ) { }

  getModelInstance(): Model<UserDocument> {
    return this.userModel
  }

  async findAll(): Promise<IUser[]> {
    const users =
      await this.userModel
        .find({})
    return users.map(
      (user) => CreateUserDto.fromEntity(user)
    )
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<IUser> {
    const user =
      await this.userModel
        .findById({ _id })
    return CreateUserDto.fromEntity(user)
  }

  async create(
    createUserDto: CreateUserDto)
    : Promise<IUser> {
    const data = CreateUserDto.toEntity(createUserDto);
    const newUser = new this.userModel(data);
    const createdUser = await newUser.save();
    return CreateUserDto.fromEntity(createdUser)
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateUserDto,
  ): Promise<IUser> {
    const updatedUser =
      await this.userModel
        .findOneAndUpdate(
          { _id },
          updatedData,
          {
            new: true,
          },
        );
    return CreateUserDto.fromEntity(updatedUser);
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.userModel
      .deleteOne({ _id });
    return
  }
}