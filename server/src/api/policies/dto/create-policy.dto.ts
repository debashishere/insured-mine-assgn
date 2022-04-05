import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import * as mongoose from 'mongoose'
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";
import { IPolicy } from "../interface/policy.interface";
import { POLICY_TYPE } from "../schema/policy-type.enum";
import { PolicyDocument } from "../schema/policy.schema";

export class CreatePolicyDto {

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  policy_num: string;

  @IsNotEmpty()
  @IsEnum(POLICY_TYPE)
  @ApiProperty()
  policy_type: POLICY_TYPE;

  @IsNotEmpty()
  @IsEnum(POLICY_MODE)
  @ApiProperty()
  availableMode: POLICY_MODE[];


  public static from(dto: CreatePolicyDto) {
    const it = new CreatePolicyDto();
    it._id = dto._id
    it.policy_num = dto.policy_num
    it.policy_type = dto.policy_type
    it.availableMode = dto.availableMode
    return it;
  }

  public static fromEntity(entity: PolicyDocument): IPolicy {
    return this.from({
      _id: entity._id,
      policy_num: entity.policy_num,
      policy_type: entity.policy_type,
      availableMode: entity.availableMode,
    });
  }

  public static toEntity(dto: CreatePolicyDto) {
    const it = new CreatePolicyDto();
    it.policy_num = dto.policy_num
    it.policy_type = dto.policy_type
    it.availableMode = dto.availableMode
    return it;
  }

}
