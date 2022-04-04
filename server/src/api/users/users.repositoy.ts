import { Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUser } from "./interface/users.interfaces";
import { User, UserDocument } from "./schema/users.schema";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>
  ) { }

  getModelInstance(): Model<UserDocument> {
    return this.userModel
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({})
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<UserDocument> {
    return this.userModel.findById({ _id })
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.userModel.deleteOne({ _id });
    return
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const data = CreateUserDto.toEntity(createUserDto);
    const newUser = new this.userModel(data);
    const createdUser = await newUser.save();
    console.log("created ", createdUser)
    return createdUser
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id },
      updatedData,
      {
        new: true,
      },
    );
    return updatedUser;
  }
}