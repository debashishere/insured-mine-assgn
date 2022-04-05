import { MongooseModule } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { closeInMongodConnection, rootMongooseTestModule } from "../../setup/mongoMemory"
import * as mongoose from 'mongoose'
import { AgentsService } from "../../../src/api/agents/agents.service"
import { AgentSchema } from "../../../src/api/agents/schema/agents.schema"
import { AgentsRepository } from "../../../src/api/agents/agents.repository"
import { IAgent } from "../../../src/api/agents/interface/agent.interface"
import { getAgentStub } from "./stubs/agent.stub"

describe('AgentService', () => {
  let service: AgentsService;

  beforeAll(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        imports: [
          rootMongooseTestModule(),
          MongooseModule.forFeature([
            {
              name: 'Agent',
              schema: AgentSchema
            }
          ])
        ],
        providers: [
          AgentsRepository,
          AgentsService
        ]
      }).compile()
    service = module.get<AgentsService>(AgentsService);
  })

  afterAll(async () => {
    await closeInMongodConnection()
  })

  describe(`Agent Service`, () => {
    let createdAgent: IAgent;

    it(`Should be defined`, async () => {
      expect(service).toBeDefined();
    })


    describe(`CreateAgent`, () => {
      it('createAgent: should create and return a Agent',
        async () => {
          const AgentData = getAgentStub();
          createdAgent = await service.create(AgentData);
          expect(
            createdAgent._id
              .toString()
              .length
          ).toEqual(24);

          const dbAgent: IAgent = await service
            .getModelInstance()
            .findById(createdAgent._id);
          expect(dbAgent._id).toEqual(createdAgent._id);
        });
    })


    describe(`Get Agent`, () => {
      it('getAgentById: should get a Agent by id',
        async () => {
          const foundAgent: IAgent =
            await service.findOne(createdAgent._id);
          expect(
            foundAgent._id
          ).toEqual(createdAgent._id);
        });


      it('getModelInstance: should get Model Instance',
        async () => {
          const foundModel =
            await service.getModelInstance();
          expect(
            foundModel.modelName
          ).toEqual('Agent');
        });

      it('getAllAgents: should get All Agents', async () => {
        const foundAgent: IAgent[] = await service.findAll();
        expect(foundAgent[0]._id).toEqual(createdAgent._id);
      });
    })

    describe(`Update Agent`, () => {
      it(`Update`, async () => {
        const name = 'Updated First';
        const data = getAgentStub();
        data.name = name;
        const updatedAgent: IAgent =
          await service.update(createdAgent._id, data);
        expect(updatedAgent.name).toEqual(name)
      })
    })


    describe(`Delete Agent By Id`, () => {
      it(`Delete`, async () => {
        const _id: mongoose.Types.ObjectId = createdAgent._id;
        await service.remove(_id);

        const foundAgent = await service.findOne(_id);
        expect(foundAgent).toBe(null)
      })
    })

  })
})