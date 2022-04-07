import { BadRequestException, Injectable } from '@nestjs/common';
import { CATAGORY_NAME } from '../../api/users/schema/catagory-name.enum';

@Injectable()
export class CommonService {
  getRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  getLOBNameEnum(name: string): CATAGORY_NAME {
    const nameStr = name
      .match(/[a-zA-Z]+/g)
      .join()
      .toLowerCase()
    // replace , chars
    const cleanName = this.replaceAll(nameStr, ',', '')
    let compVal: string;

    for (const value of Object.values(CATAGORY_NAME)) {
      compVal = this.replaceAll(value, '_', '')
        .toLocaleLowerCase();
      if (compVal === cleanName) {
        return CATAGORY_NAME[value];
      }
    }
    throw new BadRequestException(`LOB Name Not Found.`)

  }




}
