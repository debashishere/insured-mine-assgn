import { ApiProperty } from "@nestjs/swagger";
import {
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
  @IsString()
  @ApiProperty()
  catagory: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  csr: string;


  public static from(dto: CreateCarrierDto) {
    const it = new CreateCarrierDto();
    it._id = dto._id;
    it.name = dto.name;
    it.catagory = dto.catagory;
    it.csr = dto.csr;
    return it;
  }

  public static FromEntity(entity: CarrierDocument): ICarrier {
    return this.from({
      _id: entity._id,
      name: entity.name,
      catagory: entity.catagory,
      csr: entity.csr,
    });
  }

  public static toEntity(dto: CreateCarrierDto) {
    const it = new CreateCarrierDto();
    it.name = dto.name;
    it.catagory = dto.catagory;
    it.csr = dto.csr;
    return it;
  }

}
