import { Schema } from 'mongoose';
interface ApplyEncryptedFiedlsOptionsI {
  encrypt: (value: string) => string;
  decrypt: (value: string) => string;
}
interface ApplyEncryptedFieldsI {
  schema: Schema;
  fields: string[];
  options?: ApplyEncryptedFiedlsOptionsI;
  json_serialize?:boolean
}
export { ApplyEncryptedFiedlsOptionsI, ApplyEncryptedFieldsI };
