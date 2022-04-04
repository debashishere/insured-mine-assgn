import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import * as mongoose from 'mongoose'
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PoliciesService } from './policies.service';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly usersService: PoliciesService) { }

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.usersService.create(createPolicyDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.usersService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id')
  _id: mongoose.Types.ObjectId,
    @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.usersService.update(_id, updatePolicyDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.usersService.remove(_id);
  }
}
