import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LOBService } from './lob.service';
import { CreateLobDto } from './dto/create-lob.dto';
import { UpdateLobDto } from './dto/update-lob.dto';
import * as mongoose from 'mongoose'

@Controller('lob')
export class LobController {
  constructor(private readonly lobService: LOBService) { }

  @Post()
  create(@Body() createLobDto: CreateLobDto) {
    return this.lobService.create(createLobDto);
  }

  @Get()
  findAll() {
    return this.lobService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.lobService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: mongoose.Types.ObjectId, @Body() updateLobDto: UpdateLobDto) {
    return this.lobService.update(_id, updateLobDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.lobService.remove(_id);
  }
}
