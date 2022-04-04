import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import * as mongoose from 'mongoose'
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";
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

  @IsEnum(ACCOUNT_TYPE)
  @IsNotEmpty()
  @ApiProperty()
  account_type: ACCOUNT_TYPE

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  account_name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  premium_amount_written?: number;


  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  premium_amount?: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  plicy_start?: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  policy_end?: Date;

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  agent?: mongoose.Types.ObjectId;

  @IsEnum(ACCOUNT_TYPE)
  @IsOptional()
  @ApiProperty({ required: false })
  policyMode?: POLICY_MODE;

  public static from(dto: CreateAccountDto) {
    const it = new CreateAccountDto();
    it._id = dto._id;
    it.user = dto.user;
    it.account_type = dto.account_type;
    it.account_name = dto.account_name;
    it.premium_amount_written = dto.premium_amount_written;
    it.premium_amount = dto.premium_amount;
    it.plicy_start = dto.plicy_start;
    it.policy_end = dto.policy_end;
    it.agent = dto.agent;
    it.policyMode = dto.policyMode;
    return it;
  }

  public static fromEntity(entity: AccountDocument): IAccount {
    return this.from({
      _id: entity._id,
      user: entity.user,
      account_type: entity.account_type,
      account_name: entity.account_name,
      premium_amount_written: entity.premium_amount_written,
      premium_amount: entity.premium_amount,
      plicy_start: entity.plicy_start,
      policy_end: entity.policy_end,
      agent: entity.agent,
      policyMode: entity.policyMode,
    });
  }

  public static toEntity(dto: CreateAccountDto) {
    const it = new CreateAccountDto();
    it.user = dto.user;
    it.account_type = dto.account_type;
    it.account_name = dto.account_name;
    it.premium_amount_written = dto.premium_amount_written;
    it.premium_amount = dto.premium_amount;
    it.plicy_start = dto.plicy_start;
    it.policy_end = dto.policy_end;
    it.agent = dto.agent;
    it.policyMode = dto.policyMode;
    return it;
  }

}
