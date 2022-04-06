import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { CreateLobDto } from './dto/create-lob.dto';
import { UpdateLobDto } from './dto/update-lob.dto';
import { ILOB } from './interface/lob.interface';
import { LOBRepository } from './lob.repository';
import { LOBDocument } from './schema/lob.schema';
import * as mongoose from 'mongoose'

@Injectable()
export class LOBService {
  constructor(
    private readonly lobRepository: LOBRepository
  ) { }

  getModelInstance(): Model<LOBDocument> {
    return this.lobRepository.getModelInstance()
  }

  async create(
    createLOBDto: CreateLobDto)
    : Promise<ILOB> {
    const { name } = createLOBDto;
    const foundLOB = this.lobRepository.findOneByName(name);

    if (foundLOB) {
      return foundLOB
    } else {
      return this.lobRepository.create(createLOBDto)
    }
  }


  async findAll()
    : Promise<ILOB[]> {
    return this.lobRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<ILOB> {
    return this.lobRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updateLOBDto: UpdateLobDto)
    : Promise<ILOB> {
    return this.lobRepository.update(_id, updateLOBDto);
  }

  async remove(_id: mongoose.Types.ObjectId) {
    return this.lobRepository.deleteOne(_id);
  }
}
