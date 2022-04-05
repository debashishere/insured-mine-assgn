import { MongooseModule } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { closeInMongodConnection, rootMongooseTestModule } from "../../setup/mongoMemory"
import * as mongoose from 'mongoose'
import { PoliciesService } from "../../../src/api/policies/policies.service"
import { PolicySchema } from "../../../src/api/policies/schema/policy.schema"
import { PoliciesRepository } from "../../../src/api/policies/policies.repository"
import { IPolicy } from "../../../src/api/policies/interface/policy.interface"
import { getPolicyStub } from "./stubs/policy.stubs"
import { POLICY_TYPE } from "../../../src/api/policies/schema/policy-type.enum"

describe('PoliciesService', () => {
  let service: PoliciesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: 'Policy',
            schema: PolicySchema
          }
        ])
      ],
      providers: [
        PoliciesRepository,
        PoliciesService
      ]
    }).compile()
    service = module.get<PoliciesService>(PoliciesService);
  })

  afterAll(async () => {
    await closeInMongodConnection()
  })

  describe(`Policies Service`, () => {
    let createdPolicy: IPolicy;

    it(`Should be defined`, async () => {
      expect(service).toBeDefined();
    })


    describe(`CreatePolicies`, () => {
      it('should create and return a Policy',
        async () => {
          const data = getPolicyStub();
          createdPolicy =
            await service.create(data);
          expect(
            createdPolicy._id
              .toString().length
          ).toEqual(24);
        });
    })


    describe(`Get Policies`, () => {
      it('should get a Policies by id',
        async () => {
          const foundPolicies: IPolicy =
            await service
              .findOne(createdPolicy._id);
          expect(
            foundPolicies._id
          ).toEqual(createdPolicy._id);
        });


      it('getModelInstance: should get Model Instance',
        async () => {
          const foundModel =
            await service.getModelInstance();
          expect(
            foundModel.modelName
          ).toEqual('Policy');
        });

      it('getAllPoliciess: should get All Policiess',
        async () => {
          const foundPolicies: IPolicy[] =
            await service.findAll();
          expect(
            foundPolicies[0]._id
          ).toEqual(createdPolicy._id);
        });
    })

    describe(`Update Policies`, () => {
      it(`Update`, async () => {
        const policy_type = POLICY_TYPE.SINGLE;
        const data = getPolicyStub();
        data.policy_type = policy_type;
        const updatedPolicies: IPolicy =
          await service
            .update(createdPolicy._id, data);
        expect(
          updatedPolicies.policy_type
        ).toEqual(policy_type)
      })
    })


    describe(`Delete Policies By Id`, () => {
      it(`Delete`, async () => {
        const _id: mongoose.Types.ObjectId = createdPolicy._id;
        await service.remove(_id);

        const foundPolicies = await service.findOne(_id);
        expect(foundPolicies).toBe(null)
      })
    })

  })
})