import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import * as mongoose from 'mongoose'
import { ICarrier } from "../interfaces/carrier.interface";
import { CarrierDocument } from "../schema/carrier.schema";

export class CreateCarrierDto {

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  csrs: string[];

  @IsOptional()
  @ApiProperty()
  @IsArray()
  lobs?: mongoose.Types.ObjectId[];



  public static from(dto: CreateCarrierDto) {
    const it = new CreateCarrierDto();
    it._id = dto._id;
    it.name = dto.name;
    it.csrs = dto.csrs;
    it.lobs = dto.lobs;
    return it;
  }

  public static fromEntity(entity: CarrierDocument): ICarrier {
    return this.from({
      _id: entity._id,
      name: entity.name,
      csrs: entity.csrs,
      lobs: entity.lobs,
    });
  }

  public static toEntity(dto: CreateCarrierDto) {
    const it = new CreateCarrierDto();
    it.name = dto.name;
    it.csrs = dto.csrs;
    it.lobs = dto.lobs;
    return it;
  }

}
