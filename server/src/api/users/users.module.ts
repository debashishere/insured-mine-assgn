import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repositoy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'User',
        schema: UserSchema
      }]
    )
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    UsersRepository
  ],
  exports: [
    UsersService,
    UsersRepository
  ]
})
export class UsersModule { }
