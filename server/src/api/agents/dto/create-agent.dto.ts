import { ApiProperty } from "@nestjs/swagger";
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import * as mongoose from 'mongoose'
import { IAgent } from "../interface/agent.interface";
import { AgentDocument } from "../schema/agents.schema";

export class CreateAgentDto {

  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;


  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  producers: string[];



  public static from(dto: CreateAgentDto) {
    const it = new CreateAgentDto();
    it._id = dto._id;
    it.name = dto.name;
    it.producers = dto.producers;
    return it;
  }

  public static fromEntity(entity: AgentDocument): IAgent {
    return this.from({
      _id: entity._id,
      name: entity.name,
      producers: entity.producers,
    });
  }

  public static toEntity(dto: CreateAgentDto) {
    const it = new CreateAgentDto();
    it.name = dto.name;
    it.producers = dto.producers;
    return it;
  }

}
