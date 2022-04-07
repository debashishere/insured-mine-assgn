import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import * as mongoose from 'mongoose'
import { IAccountPolicy } from "../interface/account-policy.interface";
import { IAccount } from "../interface/account.interface";
import { AccountDocument } from "../schema/account.schema";
import { ACCOUNT_TYPE } from "../schema/account.type.enum";

export class CreateAccountDto {

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  user: mongoose.Types.ObjectId

  @Exclude()
  @IsEnum(ACCOUNT_TYPE)
  @IsOptional()
  @ApiProperty({ required: false })
  account_type?: ACCOUNT_TYPE


  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  accountTypeStr?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  account_name: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  account_policies?: IAccountPolicy[];

  public static from(dto: CreateAccountDto) {
    const it = new CreateAccountDto();
    it._id = dto._id;
    it.user = dto.user;
    it.account_type = dto.account_type;
    it.account_name = dto.account_name;
    it.account_policies = dto.account_policies;
    return it;
  }

  public static fromEntity(
    entity: AccountDocument)
    : IAccount {
    return this.from({
      _id: entity._id,
      user: entity.user,
      account_type: entity.account_type,
      account_name: entity.account_name,
      account_policies: entity.account_policies,
    });
  }

  public static toEntity(dto: CreateAccountDto) {
    const it = new CreateAccountDto();
    it.user = dto.user;
    it.account_type = dto.account_type;
    it.account_name = dto.account_name;
    it.account_policies = dto.account_policies;
    return it;
  }

}
