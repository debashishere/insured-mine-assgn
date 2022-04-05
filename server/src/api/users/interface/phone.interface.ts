import { PHONE_TAG } from "../schema/phone-tag.enum";

export interface IPhone {
  tags: PHONE_TAG[];
  // (336) 761-8572 Ext.0012
  number: string;
  // .0012
  ext?: string;
  //3367618572 
  Inumber?: number;
}