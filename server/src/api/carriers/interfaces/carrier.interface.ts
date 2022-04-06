import * as mongoose from 'mongoose'

export interface ICarrier {
  _id?: mongoose.Types.ObjectId;
  name: string;
  csrs: string[];
}