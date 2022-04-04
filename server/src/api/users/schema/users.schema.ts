import { GENDER } from './gender.enum';
import { USER_TYPE } from './user.type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interface/users.interfaces';
import { IPhone } from '../interface/phone.interface';
import { IAddress } from '../interface/address.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User implements IUser {

  @Prop()
  firstName: string;

  @Prop()
  email: string;

  @Prop()
  phone: IPhone[];

  @Prop({ required: false })
  dob?: Date;

  @Prop({ required: false })
  address?: IAddress[];

  @Prop({ required: false })
  gender?: GENDER;

  @Prop({ required: false })
  type?: USER_TYPE;

}

export const UserSchema = SchemaFactory.createForClass(User)