import * as mongoose from 'mongoose';
import { decryptText, encryptText } from '../utils';
import { ApplyEncryptedFieldsI } from '../interfaces/applyEncryptedFields.interface';
const { Types } = mongoose.Schema;

const applyEncryptedFields = (props: ApplyEncryptedFieldsI) => {
  const { schema, fields, options,json_serialize=true } = props;
  const { encrypt = encryptText, decrypt = decryptText } = options || {};
  const encryptedFieldsPatch: Record<string, any> = {};
  const JSON_TAG = '__json__::'

  fields.forEach((field) => {
    const path = schema.path(field);
    if(!path){
      console.warn(`Field "${field}" is not defined in the schema. Skipping encryption.`)
      return;
    }
    const originalOptions = path.options || {};
    if(!json_serialize && path.instance !== 'String'){
      console.warn(`Skipping non-string field "${field}" (json_serialize is false).`)
      return;
    }
    encryptedFieldsPatch[field] = {
      ...originalOptions,
      type: Types.String,
      set: (value: any) => {
        if(value == null) return value;
        const isString = typeof value === 'string';
        if(json_serialize && !isString){
          const serialized = JSON.stringify(value);
          return encrypt(JSON_TAG+serialized)
        }
        return encrypt(value)
      },
      get: (value: string) => {
        if(value == null) return value;
        const decrypted = decrypt(value);
        if(json_serialize && decrypted.startsWith(JSON_TAG)){
          const stripped = decrypted.slice(JSON_TAG.length);
          try{
            return JSON.parse(stripped)
          }catch(err){
            console.warn('Failed to parse JSON-tagged decrypted value:',err);
            return decrypted;
          }
        }
        return decrypted
      }
    };
  });

  schema.add(encryptedFieldsPatch);
  schema.set('toJSON', { getters: true });
  schema.set('toObject', { getters: true });
};
export default applyEncryptedFields;
