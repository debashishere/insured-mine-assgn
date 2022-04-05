import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import * as mongoose from 'mongoose'
import { IAddress } from "../interface/address.interface";
import { IPhone } from "../interface/phone.interface";
import { IUser } from "../interface/users.interfaces";
import { GENDER } from "../schema/gender.enum";
import { USER_TYPE } from "../schema/user.type.enum";
import { UserDocument } from "../schema/users.schema";

export class CreateUserDto {

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: IPhone[];

  // month-day-year
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty()
  dob?: Date;

  @IsEnum(GENDER)
  @IsOptional()
  @ApiProperty()
  gender?: GENDER;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  address?: IAddress[];

  @IsOptional()
  @ApiProperty({ required: false })
  type?: USER_TYPE



  public static from(dto: Partial<CreateUserDto>) {
    const it = new CreateUserDto();
    it._id = dto._id;
    it.firstName = dto.firstName;
    it.email = dto.email;
    it.phone = dto.phone;
    it.dob = dto.dob;
    it.address = dto.address;
    it.gender = dto.gender;
    it.type = dto.type;
    return it;
  }


  public static fromEntity(entity: UserDocument): IUser {
    return this.from({
      _id: entity._id,
      firstName: entity.firstName,
      email: entity.email,
      phone: entity.phone,
      dob: entity.dob,
      address: entity.address,
      gender: entity.gender,
      type: entity.type,
    });
  }

  public static toEntity(dto: CreateUserDto) {
    const it = new CreateUserDto();
    it.firstName = dto.firstName;
    it.email = dto.email;
    it.phone = dto.phone;
    it.dob = dto.dob;
    it.address = dto.address;
    it.gender = dto.gender;
    it.type = dto.type;
    return it;
  }

}
