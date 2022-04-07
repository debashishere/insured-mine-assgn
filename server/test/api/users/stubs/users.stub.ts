import { CreateUserDto } from "../../../../src/api/users/dto/create-user.dto";
import { PHONE_TAG } from "../../../../src/api/users/schema/phone-tag.enum";
import { USER_TYPE } from "../../../../src/api/users/schema/user.type.enum";


export const getUserStub = (): CreateUserDto => {
  const data = {
    firstName: 'Test First Name',
    email: 'test@gmail.com',
    userType: USER_TYPE.ACTIVE_CLIENT,
    phone: [
      {
        tags: [PHONE_TAG.PRIMARY],
        number: '(+91) 700363 7367',
        Inumber: 917003637367,
      }
    ]
  }

  return data
}