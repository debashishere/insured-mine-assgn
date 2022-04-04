import * as mongoose from 'mongoose'

export interface ICarrier {
  _id?: mongoose.Types.ObjectId;
  name: string;
  catagory: string;
  csr: string;
}