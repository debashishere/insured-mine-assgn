import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { CreateLobDto } from './dto/create-lob.dto';
import { UpdateLobDto } from './dto/update-lob.dto';
import { ILOB } from './interface/lob.interface';
import { LOBRepository } from './lob.repository';
import { LOBDocument } from './schema/lob.schema';
import * as mongoose from 'mongoose'
import { CATAGORY_NAME } from '../users/schema/catagory-name.enum';
import { CommonService } from '../../shared/services/common.service';

@Injectable()
export class LOBService {
  constructor(
    private readonly lobRepository: LOBRepository,
    private readonly commonService: CommonService,
  ) { }

  getModelInstance(): Model<LOBDocument> {
    return this.lobRepository.getModelInstance()
  }

  async create(
    createLOBDto: CreateLobDto)
    : Promise<ILOB> {
    const { name, categoryName } = createLOBDto;

    if (!categoryName) {
      throw new BadRequestException(`LOB Name is a required field.`)
    }
    createLOBDto.name = this.commonService.getLOBNameEnum(categoryName)
    const foundLOB = await this.lobRepository.findOneByName(createLOBDto.name);
    if (foundLOB) {
      return foundLOB
    } else {
      return this.lobRepository.create(createLOBDto)
    }
  }

  // getLOBNameEnum(name: string): CATAGORY_NAME {
  //   const nameStr = name
  //     .match(/[a-zA-Z]+/g)
  //     .join()
  //     .toLowerCase()
  //   // replace , chars
  //   const cleanName = this.commonService
  //     .replaceAll(nameStr, ',', '')
  //   let compVal: string;

  //   for (const value of Object.values(CATAGORY_NAME)) {
  //     compVal = this.commonService
  //       .replaceAll(value, '_', '')
  //       .toLocaleLowerCase();
  //     if (compVal === cleanName) {
  //       return CATAGORY_NAME[value];
  //     }
  //   }
  //   throw new BadRequestException(`LOB Name Not Found.`)

  // }

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
