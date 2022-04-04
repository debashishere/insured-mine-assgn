import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environmentConfig from './config/environment.config';
import databaseConfig, { DatabaseConfig } from './config/database.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        environmentConfig,
      ]
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get<DatabaseConfig>('database'),
      inject: [ConfigService]
    })
  ],
  exports: []
})
export class CommonModule { }