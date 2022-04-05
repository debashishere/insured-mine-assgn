import { Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { AccountDocument } from "./schema/account.schema";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { IAccount } from "./interface/account.interface";

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectModel('Account')
    private AccountModel
      : Model<AccountDocument>
  ) { }

  getModelInstance(): Model<AccountDocument> {
    return this.AccountModel
  }

  async findAll(): Promise<IAccount[]> {
    const accounts = await this.AccountModel.find({})
    return accounts.map(
      acc => CreateAccountDto.fromEntity(acc)
    )
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<AccountDocument> {
    return await this.AccountModel
      .findById({ _id })
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.AccountModel.deleteOne({ _id });
    return
  }

  async create(
    createAccountDto: CreateAccountDto)
    : Promise<IAccount> {
    const data = CreateAccountDto
      .toEntity(createAccountDto);
    const newAccount = new this.AccountModel(data);
    const createdAccount
      = await newAccount
        .save();
    return CreateAccountDto
      .fromEntity(createdAccount)
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateAccountDto,
  ): Promise<IAccount> {
    const updatedAccount =
      await this.AccountModel
        .findOneAndUpdate(
          { _id },
          updatedData,
          {
            new: true,
          },
        );
    return CreateAccountDto
      .fromEntity(updatedAccount);
  }
}