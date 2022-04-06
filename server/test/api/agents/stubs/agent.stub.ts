import { CreateAccountDto } from "../../../../src/api/accounts/dto/create-account.dto"
import { CreateAgentDto } from "../../../../src/api/agents/dto/create-agent.dto"


export const getAgentStub = (): CreateAgentDto => {
  const data = CreateAgentDto.toEntity({
    name: "Some Name",
    producers: ["Some prod"],
  })

  return data
}