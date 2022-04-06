import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { LOBDocument } from "./schema/lob.schema";
import { CreateLobDto } from "./dto/create-lob.dto";
import { ILOB } from "./interface/lob.interface";
import { UpdateLobDto } from "./dto/update-lob.dto";

@Injectable()
export class LOBRepository {
  constructor(
    @InjectModel('LOB')
    private policyModel: Model<LOBDocument>
  ) { }

  getModelInstance(): Model<LOBDocument> {
    return this.policyModel
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<LOBDocument> {
    return this.policyModel.findById({ _id })

  }

  async findAll(): Promise<ILOB[]> {
    const policies = await this.policyModel.find({})
    return policies.map(pol => CreateLobDto.fromEntity(pol))
  }

  async create(
    createLOBDto: CreateLobDto)
    : Promise<ILOB> {
    const data = CreateLobDto.toEntity(createLOBDto);
    const newLOB = new this.policyModel(data);
    const createdLOB = await newLOB.save();
    return CreateLobDto.fromEntity(createdLOB)
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateLobDto,
  ): Promise<ILOB> {
    const updatedLOB = await this.policyModel.findOneAndUpdate(
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
    await this.policyModel.deleteOne({ _id });
    return
  }
}