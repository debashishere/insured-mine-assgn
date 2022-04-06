import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import * as mongoose from 'mongoose'
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";
import { IAccountPolicy } from "../interface/account-policy.interface";
import { AccountPolicyDocument } from "../schema/account-policy.schema";
import { ACCOUNT_TYPE } from "../schema/account.type.enum";

export class AccountPolicyDto {

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  policy_id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  producer: string;

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

  public static from(dto: AccountPolicyDto) {
    const it = new AccountPolicyDto();
    it.policy_id = dto.policy_id;
    it.premium_amount_written = dto.premium_amount_written;
    it.premium_amount = dto.premium_amount;
    it.plicy_start = dto.plicy_start;
    it.policy_end = dto.policy_end;
    it.agent = dto.agent;
    it.policyMode = dto.policyMode;
    it.producer = dto.producer;

    return it;
  }

  public static fromEntity(
    entity: AccountPolicyDocument)
    : IAccountPolicy {
    return this.from({
      policy_id: entity.policy_id,
      premium_amount_written: entity.premium_amount_written,
      premium_amount: entity.premium_amount,
      plicy_start: entity.plicy_start,
      policy_end: entity.policy_end,
      agent: entity.agent,
      policyMode: entity.policyMode,
      producer: entity.producer,
    });
  }

  public static toEntity(dto: AccountPolicyDto) {
    const it = new AccountPolicyDto();
    it.premium_amount_written = dto.premium_amount_written;
    it.premium_amount = dto.premium_amount;
    it.plicy_start = dto.plicy_start;
    it.policy_end = dto.policy_end;
    it.agent = dto.agent;
    it.policyMode = dto.policyMode;
    it.producer = dto.producer;
    return it;
  }

}
