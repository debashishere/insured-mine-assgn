import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { LOBDocument } from "./schema/lob.schema";
import { CreateLobDto } from "./dto/create-lob.dto";
import { ILOB } from "./interface/lob.interface";
import { UpdateLobDto } from "./dto/update-lob.dto";
import { CATAGORY_NAME } from "../users/schema/catagory-name.enum";

@Injectable()
export class LOBRepository {
  constructor(
    @InjectModel('LOB')
    private lobModel: Model<LOBDocument>
  ) { }

  getModelInstance(): Model<LOBDocument> {
    return this.lobModel
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<LOBDocument> {
    return this.lobModel.findById({ _id })

  }

  async findOneByName(
    name: CATAGORY_NAME)
    : Promise<LOBDocument> {
    return this.lobModel
      .findOne({ name })
  }

  async findAll(): Promise<ILOB[]> {
    const policies = await this.lobModel.find({})
    return policies.map(pol => CreateLobDto.fromEntity(pol))
  }

  async create(
    createLOBDto: CreateLobDto)
    : Promise<ILOB> {
    const data = CreateLobDto.toEntity(createLOBDto);
    const newLOB = new this.lobModel(data);
    const createdLOB = await newLOB.save();
    return CreateLobDto.fromEntity(createdLOB)
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateLobDto,
  ): Promise<ILOB> {
    const updatedLOB = await this.lobModel.findOneAndUpdate(
      { _id },
      updatedData,
      {
        new: true,
      },
    );
    return CreateLobDto.fromEntity(updatedLOB);
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.lobModel.deleteOne({ _id });
    return
  }
}