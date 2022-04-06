import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { PolicyDocument } from "./schema/policy.schema";
import { CreatePolicyDto } from "./dto/create-policy.dto";
import { UpdatePolicyDto } from "./dto/update-policy.dto";
import { IPolicy } from "./interface/policy.interface";

@Injectable()
export class PoliciesRepository {
  constructor(
    @InjectModel('Policy')
    private policyModel: Model<PolicyDocument>
  ) { }

  getModelInstance(): Model<PolicyDocument> {
    return this.policyModel
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<PolicyDocument> {
    return this.policyModel.findById({ _id })

  }

  async findOneByNumber(
    policy_num: string)
    : Promise<PolicyDocument> {
    return this.policyModel.findOne({ policy_num })

  }

  async findAll(): Promise<IPolicy[]> {
    const policies = await this.policyModel.find({})
    return policies.map(pol => CreatePolicyDto.fromEntity(pol))
  }

  async create(
    createPolicyDto: CreatePolicyDto)
    : Promise<IPolicy> {
    const data = CreatePolicyDto.toEntity(createPolicyDto);
    const newPolicy = new this.policyModel(data);
    const createdPolicy = await newPolicy.save();
    return CreatePolicyDto.fromEntity(createdPolicy)
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdatePolicyDto,
  ): Promise<IPolicy> {
    const updatedPolicy = await this.policyModel.findOneAndUpdate(
      { _id },
      updatedData,
      {
        new: true,
      },
    );
    return CreatePolicyDto.fromEntity(updatedPolicy);
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.policyModel.deleteOne({ _id });
    return
  }
}