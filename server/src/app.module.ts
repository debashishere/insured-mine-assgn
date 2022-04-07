import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './shared/common.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File(
          {
            filename: 'error.log',
            level: 'error'
          }),
        new winston.transports.File(
          {
            filename: 'combined.log'
          }),]
    }),

    CommonModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
