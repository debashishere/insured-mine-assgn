import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import * as mongoose from 'mongoose'
import { CarriersService } from './carriers.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@Controller('api/carriers')
export class CarriersController {
  constructor(
    private readonly carriersService: CarriersService
  ) { }

  @Post()
  create(@Body() createCarrierDto: CreateCarrierDto) {
    return this.carriersService.create(createCarrierDto);
  }

  @Get()
  findAll() {
    return this.carriersService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: mongoose.Types.ObjectId) {
    return this.carriersService.findOne(_id);
  }

  @Patch(':_id')
  update(
    @Param('_id')
    _id: mongoose.Types.ObjectId,
    @Body() updateCarrierDto: UpdateCarrierDto) {
    return this.carriersService
      .update(_id, updateCarrierDto);
  }

  @Delete(':_id')
  remove(
    @Param('_id')
    _id: mongoose.Types.ObjectId) {
    return this.carriersService.remove(_id);
  }
}
