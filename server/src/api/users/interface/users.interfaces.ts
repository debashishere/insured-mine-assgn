import * as mongoose from 'mongoose'
import { GENDER } from '../schema/gender.enum';
import { USER_TYPE } from '../schema/user.type.enum';
import { IAddress } from './address.interface';
import { IPhone } from './phone.interface';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  firstName: string;
  email: string;
  phone: IPhone[];
  dob?: Date;
  address?: IAddress[];
  gender?: GENDER;
  type?: USER_TYPE;
  userType?: string;

}