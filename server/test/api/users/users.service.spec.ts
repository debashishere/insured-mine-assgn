import { MongooseModule } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { closeInMongodConnection, rootMongooseTestModule } from "../../setup/mongoMemory"
import * as mongoose from 'mongoose'
import { UsersService } from "../../../src/api/users/users.service"
import { UserSchema } from "../../../src/api/users/schema/users.schema"
import { UsersRepository } from "../../../src/api/users/users.repositoy"
import { IUser } from "../../../src/api/users/interface/users.interfaces"
import { getUserStub } from "./stubs/users.stub"

describe('UserService', () => {
  let service: UsersService;

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
    let createdUser: IUser;

    it(`Should be defined`, async () => {
      expect(service).toBeDefined();
    })


    describe(`CreateUser`, () => {
      it('createUser: should create and return a User', async () => {
        const UserData = getUserStub();
        createdUser = await service.create(UserData);
        expect(createdUser._id.toString().length).toEqual(24);

        const dbUser: IUser = await service
          .getModelInstance()
          .findById(createdUser._id);
        expect(dbUser._id).toEqual(createdUser._id);
      });
    })


    describe(`Get User`, () => {
      it('getUserById: should get a User by id', async () => {
        const foundUser: IUser = await service.findOne(createdUser._id);
        expect(foundUser._id).toEqual(createdUser._id);
      });


      it('getModelInstance: should get Model Instance', async () => {
        const foundModel = await service.getModelInstance();
        expect(foundModel.modelName).toEqual('User');
      });

      it('getAllUsers: should get All Users', async () => {
        const foundUser: IUser[] = await service.findAll();
        expect(foundUser[0]._id).toEqual(createdUser._id);
      });
    })

    describe(`Update User`, () => {
      it(`Update`, async () => {
        const firstName = 'Updated First';
        const data = getUserStub();
        data.firstName = firstName;
        const updatedUser: IUser =
          await service.update(createdUser._id, data);
        expect(updatedUser.firstName).toEqual(firstName)
      })
    })


    describe(`Delete User By Id`, () => {
      it(`Delete`, async () => {
        const _id: mongoose.Types.ObjectId = createdUser._id;
        await service.remove(_id);

        const foundUser = await service.findOne(_id);
        expect(foundUser).toBe(null)
      })
    })

  })
})