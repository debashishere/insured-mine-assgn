import { MongooseModule } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { closeInMongodConnection, rootMongooseTestModule } from "../../setup/mongoMemory"
import { UserSchema } from '../../../src/api/users/schema/users.schema'
import { UsersRepository } from "../../../src/api/users/users.repositoy"
import { UsersService } from "../../../src/api/users/users.service"

describe('UserService', () => {
  let service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: 'User',
            schema: UserSchema
          }
        ])
      ],
      providers: [
        UsersRepository,
        UsersService
      ]
    }).compile()
    service = module.get<UsersService>(UsersService);
  })

  afterAll(async () => {
    await closeInMongodConnection()
  })

  describe(`User Service`, () => {
    it(`Should be defined`, async () => {
      expect(service).toBeDefined();
    })
  })

})