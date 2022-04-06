import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import { UpdateAccountDto } from '../accounts/dto/update-account.dto';
import { AgentsRepository } from './agents.repository';
import { CreateAgentDto } from './dto/create-agent.dto';
import { IAgent } from './interface/agent.interface';
import { AgentDocument } from './schema/agents.schema';


@Injectable()
export class AgentsService {
  constructor(private readonly agentsRepository: AgentsRepository) { }

  getModelInstance(): Model<AgentDocument> {
    return this.agentsRepository.getModelInstance()
  }

  async create(createAgentDto: CreateAgentDto) {
    const { name } = createAgentDto
    const foundAgent = await this.agentsRepository
      .findOneByName(name);
    if (foundAgent) {
      return foundAgent
    } else {
      return this.agentsRepository.create(createAgentDto)
    }
  }

  async findAll() {
    return this.agentsRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<IAgent> {
    return this.agentsRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updateAcountDto: UpdateAccountDto) {
    return this.agentsRepository.update(_id, updateAcountDto);
  }

  async remove(_id: mongoose.Types.ObjectId) {
    return this.agentsRepository.deleteOne(_id);
  }

}
