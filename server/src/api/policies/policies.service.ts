import { Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import * as mongoose from 'mongoose'
import { PoliciesRepository } from './policies.repository';
import { PolicyDocument } from './schema/policy.schema';
import { IPolicy } from './interface/policy.interface';
import { Model } from 'mongoose'

@Injectable()
export class PoliciesService {
  constructor(private readonly policiesRepository: PoliciesRepository) { }

  getModelInstance(): Model<PolicyDocument> {
    return this.policiesRepository.getModelInstance()
  }

  async create(
    createPolicyDto: CreatePolicyDto)
    : Promise<IPolicy> {
    return this.policiesRepository.create(createPolicyDto)
  }

  async findAll()
    : Promise<IPolicy[]> {
    return this.policiesRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<IPolicy> {
    return this.policiesRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updatePolicyDto: UpdatePolicyDto)
    : Promise<IPolicy> {
    return this.policiesRepository.update(_id, updatePolicyDto);
  }

  async remove(_id: mongoose.Types.ObjectId) {
    return this.policiesRepository.deleteOne(_id);
  }
}
