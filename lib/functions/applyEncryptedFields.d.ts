import { Schema } from 'mongoose';
interface ApplyEncryptedFiedlsOptionsI {
    encrypt: (value: string) => string;
    decrypt: (value: string) => string;
}
interface applyEncryptedFieldsI {
    schema: Schema;
    fields: string[];
    options?: ApplyEncryptedFiedlsOptionsI;
}
declare const applyEncryptedFields: (props: applyEncryptedFieldsI) => void;
export default applyEncryptedFields;
