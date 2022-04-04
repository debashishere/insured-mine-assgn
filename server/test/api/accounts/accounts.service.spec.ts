import { MongooseModule } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { closeInMongodConnection, rootMongooseTestModule } from "../../setup/mongoMemory"
import * as mongoose from 'mongoose'
import { AccountsService } from "../../../src/api/accounts/acounts.service"
import { AccountSchema } from "../../../src/api/accounts/schema/account.schema"
import { AccountsRepository } from "../../../src/api/accounts/accounts.repositoy"
import { IAccount } from "../../../src/api/accounts/interface/account.interface"
import { getAccountStub } from "./stubs/accounts.stub"
import { UsersService } from "../../../src/api/users/users.service"
import { UsersModule } from "../../../src/api/users/users.module"
import { getUserStub } from "../users/stubs/users.stub"
import { IUser } from "../../../src/api/users/interface/users.interfaces"
import { CreateAccountDto } from "../../../src/api/accounts/dto/create-account.dto"

describe('AccountService', () => {
  let service: AccountsService;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: 'Account',
            schema: AccountSchema
          }
        ]),
        UsersModule,
      ],
      providers: [
        AccountsRepository,
        AccountsService
      ]
    }).compile()
    service = module.get<AccountsService>(AccountsService);
    usersService = module.get<UsersService>(UsersService);
  })

  afterAll(async () => {
    await closeInMongodConnection()
  })

  describe(`Account Service`, () => {
    let createdAccount: IAccount;
    let createdUser: IUser;

    describe(`Should be defined`, () => {
      it(`Accounts Service`, async () => {
        expect(service).toBeDefined();
      })

      it(`Users Service`, async () => {
        expect(usersService).toBeDefined();
      })

    })

    describe(`CreateUser`, () => {
      it('should create and return a user', async () => {
        const userData = getUserStub();
        createdUser = await usersService.create(userData);
        expect(createdUser._id.toString().length).toEqual(24);
      });
    })


    describe(`CreateAccount`, () => {
      it('createAccount: should create and return a Account', async () => {
        const data = getAccountStub();
        const newAcc = CreateAccountDto.toEntity({
          ...data,
          user: createdUser._id,
        })
        createdAccount = await service.create(newAcc);
        expect(createdAccount._id.toString().length).toEqual(24);

        const dbAccount: IAccount = await service
          .getModelInstance()
          .findById(createdAccount._id);
        expect(dbAccount._id).toEqual(createdAccount._id);
      });
    })


    describe(`Get Account`, () => {
      it('getAccountById: should get a Account by id', async () => {
        const foundAccount: IAccount = await service.findOne(createdAccount._id);
        expect(foundAccount._id).toEqual(createdAccount._id);
      });


      it('getModelInstance: should get Model Instance', async () => {
        const foundModel = await service.getModelInstance();
        expect(foundModel.modelName).toEqual('Account');
      });

      it('getAllAccounts: should get All Accounts', async () => {
        const foundAccount: IAccount[] = await service.findAll();
        expect(foundAccount[0]._id).toEqual(createdAccount._id);
      });
    })

    describe(`Update Account`, () => {
      it(`Update`, async () => {
        const name = 'Updated Name';
        const data = getAccountStub();
        data.account_name = name;
        const updatedAccount: IAccount =
          await service.update(createdAccount._id, data);
        expect(updatedAccount.account_name).toEqual(name)
      })
    })


    describe(`Delete Account By Id`, () => {
      it(`Delete`, async () => {
        const _id: mongoose.Types.ObjectId = createdAccount._id;
        await service.remove(_id);

        const foundAccount = await service.findOne(_id);
        expect(foundAccount).toBe(null)
      })
    })

  })
})