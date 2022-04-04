import { PartialType } from '@nestjs/mapped-types';
import { CreateLobDto } from './create-lob.dto';

export class UpdateLobDto extends PartialType(CreateLobDto) {}
