import { Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { AgentDocument } from "./schema/agents.schema";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { UpdateAgentDto } from "./dto/update-agent.dto";

@Injectable()
export class AgentsRepository {
  constructor(
    @InjectModel('Agent') private AgentModel: Model<AgentDocument>
  ) { }

  getModelInstance(): Model<AgentDocument> {
    return this.AgentModel
  }

  async findAll(): Promise<AgentDocument[]> {
    return this.AgentModel.find({})
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<AgentDocument> {
    return this.AgentModel.findById({ _id })
  }

  async deleteOne(
    _id: mongoose.Types.ObjectId
  ): Promise<void> {
    await this.AgentModel.deleteOne({ _id });
    return
  }

  async create(createAgentDto: CreateAgentDto): Promise<AgentDocument> {
    const data = CreateAgentDto.toEntity(createAgentDto);
    const newAgent = new this.AgentModel(data);
    const createdAgent = await newAgent.save();
    console.log("created ", createdAgent)
    return createdAgent
  }


  async update(
    _id: mongoose.Types.ObjectId,
    updatedData: UpdateAgentDto,
  ): Promise<AgentDocument> {
    const updatedAgent = await this.AgentModel.findOneAndUpdate(
      { _id },
      updatedData,
      {
        new: true,
      },
    );
    return updatedAgent;
  }
}