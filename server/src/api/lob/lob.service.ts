import { Injectable } from '@nestjs/common';
import { CreateLobDto } from './dto/create-lob.dto';
import { UpdateLobDto } from './dto/update-lob.dto';

@Injectable()
export class LobService {
  create(createLobDto: CreateLobDto) {
    return 'This action adds a new lob';
  }

  findAll() {
    return `This action returns all lob`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lob`;
  }

  update(id: number, updateLobDto: UpdateLobDto) {
    return `This action updates a #${id} lob`;
  }

  remove(id: number) {
    return `This action removes a #${id} lob`;
  }
}
