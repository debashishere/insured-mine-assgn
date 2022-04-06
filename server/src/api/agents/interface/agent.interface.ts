import * as mongoose from 'mongoose'

export interface IAgent {
  _id?: mongoose.Types.ObjectId;
  name: string;
  producers: string[];
}