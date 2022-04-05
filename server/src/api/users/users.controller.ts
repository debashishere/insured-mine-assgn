import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose'
import { IUser } from './interface/users.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { intercept } from '../../shared/services/file.service';


@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto)
    : Promise<IUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll()
    : Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':_id')
  findOne(
    @Param('_id')
    _id: mongoose.Types.ObjectId)
    : Promise<IUser> {
    return this.usersService.findOne(_id);
  }

  @Patch(':_id')
  update(
    @Param('_id')
    _id: mongoose.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto)
    : Promise<IUser> {
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(':_id')
  remove(
    @Param('_id')
    _id: mongoose.Types.ObjectId)
    : Promise<void> {
    return this.usersService.remove(_id);
  }



  @Post('/upload')
  @UseInterceptors(
    FileInterceptor("csv", intercept())
  )
  async uploadFile(
    @UploadedFile() file,
  ): Promise<void> {
    console.log(" file **", file)
    if (!file) {
      throw new BadRequestException(`File Expected!`)
    }
    await this.usersService.handleUpload(file);
    // return this.usersService.uploadFile(file, req.body, sharingUser._id);
  }
}
