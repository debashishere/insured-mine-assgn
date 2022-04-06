import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IAgent } from "../interface/agent.interface";
import { Document } from 'mongoose'

export type AgentDocument = Agent & Document;

@Schema({ timestamps: true })
export class Agent implements IAgent {

  @Prop({ unique: true })
  name: string;

  @Prop()
  producers: string[];

}

export const AgentSchema = SchemaFactory.createForClass(Agent);

