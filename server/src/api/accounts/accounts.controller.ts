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
import { AccountsService } from './acounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccount } from './interface/account.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  create(
    @Body() createAccountDto: CreateAccountDto)
    : Promise<IAccount> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll()
    : Promise<IAccount[]> {
    return this.accountsService.findAll();
  }

  @Get(':_id')
  findOne(
    @Param('_id')
    _id: mongoose.Types.ObjectId)
    : Promise<IAccount> {
    return this.accountsService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id')
  _id: mongoose.Types.ObjectId,
    @Body() updateAccountDto: UpdateAccountDto)
    : Promise<IAccount> {
    return this.accountsService.update(_id, updateAccountDto);
  }

  @Delete(':_id')
  remove(
    @Param('_id') id: mongoose.Types.ObjectId)
    : Promise<void> {
    return this.accountsService.remove(id);
  }
}
