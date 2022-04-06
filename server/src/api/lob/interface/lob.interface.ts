import { CATAGORY_NAME } from "../../users/schema/catagory-name.enum";
import * as mongoose from 'mongoose'

export interface ILOB {
  _id?: mongoose.Types.ObjectId,
  carrier: mongoose.Types.ObjectId,
  name: CATAGORY_NAME,
}