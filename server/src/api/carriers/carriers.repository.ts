import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { CarrierDocument } from "./schema/carrier.schema";
import { ICarrier } from "./interfaces/carrier.interface";
import { CreateCarrierDto } from "./dto/create-carrier.dto";
import { UpdateCarrierDto } from "./dto/update-carrier.dto";

@Injectable()
export class CarriersRepository {
  constructor(
    @InjectModel('Carrier')
    private CarrierModel
      : Model<CarrierDocument>
  ) { }

  getModelInstance(): Model<CarrierDocument> {
    return this.CarrierModel
  }

  async findAll(): Promise<ICarrier[]> {
    const carriers = await this.CarrierModel.find({})
    return carriers.map(
      acc => CreateCarrierDto.fromEntity(acc)
    )
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<CarrierDocument> {
    return await this.CarrierModel
      .findById({ _id })
  }

  async findOneByName(
    name: string)
    : Promise<CarrierDocument> {
    return this.CarrierModel
      .findOne({ name })
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.CarrierModel.deleteOne({ _id });
    return
  }

  async create(
    createCarrierDto: CreateCarrierDto)
    : Promise<ICarrier> {
    const data = CreateCarrierDto
      .toEntity(createCarrierDto);
    const newCarrier = new this.CarrierModel(data);
    const createdCarrier
      = await newCarrier
        .save();
    return CreateCarrierDto
      .fromEntity(createdCarrier)
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateCarrierDto,
  ): Promise<ICarrier> {
    const updatedCarrier =
      await this.CarrierModel
        .findOneAndUpdate(
          { _id },
          updatedData,
          {
            new: true,
          },
        );
    return CreateCarrierDto
      .fromEntity(updatedCarrier);
  }
}