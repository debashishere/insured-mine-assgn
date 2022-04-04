import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LobService } from './lob.service';
import { CreateLobDto } from './dto/create-lob.dto';
import { UpdateLobDto } from './dto/update-lob.dto';

@Controller('lob')
export class LobController {
  constructor(private readonly lobService: LobService) {}

  @Post()
  create(@Body() createLobDto: CreateLobDto) {
    return this.lobService.create(createLobDto);
  }

  @Get()
  findAll() {
    return this.lobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLobDto: UpdateLobDto) {
    return this.lobService.update(+id, updateLobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobService.remove(+id);
  }
}
