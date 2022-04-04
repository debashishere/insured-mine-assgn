import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import * as mongoose from 'mongoose'
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Controller('Agents')
export class AgentsController {
  constructor(private readonly AgentsService: AgentsService) { }

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.AgentsService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.AgentsService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.AgentsService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id')
  _id: mongoose.Types.ObjectId,
    @Body() updateAgentDto: UpdateAgentDto) {
    return this.AgentsService.update(_id, updateAgentDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.AgentsService.remove(_id);
  }
}
