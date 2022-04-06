import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import { CarriersRepository } from './carriers.repository';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { ICarrier } from './interfaces/carrier.interface';
import { CarrierDocument } from './schema/carrier.schema';

@Injectable()
export class CarriersService {
  constructor(private readonly CarriersRepository: CarriersRepository) { }

  getModelInstance(): Model<CarrierDocument> {
    return this.CarriersRepository.getModelInstance()
  }

  async create(
    createAcountDto: CreateCarrierDto)
    : Promise<ICarrier> {
    return this.CarriersRepository.create(createAcountDto)
  }

  async findAll()
    : Promise<ICarrier[]> {
    return this.CarriersRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<ICarrier> {
    return this.CarriersRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updateAcountDto: UpdateCarrierDto)
    : Promise<ICarrier> {
    return this.CarriersRepository.update(_id, updateAcountDto);
  }

  async remove(
    _id: mongoose.Types.ObjectId)
    : Promise<void> {
    return this.CarriersRepository.deleteOne(_id);
  }
}
