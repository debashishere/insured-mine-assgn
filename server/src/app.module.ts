import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './shared/common.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
