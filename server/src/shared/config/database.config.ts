import { registerAs } from '@nestjs/config';
import { MongooseOptionsFactory } from '@nestjs/mongoose';


export interface DatabaseConfig {
  uri: string;
  connectionName: string;
  config: MongooseOptionsFactory;
}


export default registerAs('database', () => ({
  uri: `${process.env.DB_URI}/task`,
  connectionName: 'task',
  config: {
    autoIndex: process.env.NODE_ENV !== 'production',
    loggerLevel: process.env.MONGO_LOGGER_LEVEL || 'info',
    toObject: {
      getters: true,
      virtuals: true,
      transform: true,
      flattenDecimals: true,
    },
    toJSON: {
      getters: true,
      virtuals: true,
      transform: true,
      flattenDecimals: true,
    },
  },
}))