import * as mongoose from 'mongoose';
import { decryptText, encryptText } from '../utils';
import { ApplyEncryptedFieldsI } from '../interfaces/applyEncryptedFields.interface';
const { Types } = mongoose.Schema;

const applyEncryptedFields = (props: ApplyEncryptedFieldsI) => {
  const { schema, fields, options } = props;
  const { encrypt = encryptText, decrypt = decryptText } = options || {};
  const encryptedFieldsPatch: Record<string, any> = {};

  fields.forEach((field) => {
    const path = schema.path(field);
    if (path && path.instance === 'String') {
      const originalOptions = path.options || {};
      encryptedFieldsPatch[field] = {
        ...originalOptions,
        type: Types.String,
        set: (value: string) => (value != null ? encrypt(value) : value),
        get: (value: string) => (value != null ? decrypt(value) : value),
      };
    } else {
      console.error(`Field ${field} not found or not a string`);
    }
  });

  schema.add(encryptedFieldsPatch);
  schema.set('toJSON', { getters: true });
  schema.set('toObject', { getters: true });
};
export default applyEncryptedFields;
