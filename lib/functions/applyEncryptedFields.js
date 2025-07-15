"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const utils_1 = require("../utils");
const { Types } = mongoose.Schema;
const applyEncryptedFields = (props) => {
    const { schema, fields, options, json_serialize = true } = props;
    const { encrypt = utils_1.encryptText, decrypt = utils_1.decryptText } = options || {};
    const encryptedFieldsPatch = {};
    const JSON_TAG = '__json__::';
    fields.forEach((field) => {
        const path = schema.path(field);
        if (!path) {
            console.warn(`Field "${field}" is not defined in the schema. Skipping encryption.`);
            return;
        }
        const originalOptions = path.options || {};
        if (!json_serialize && path.instance !== 'String') {
            console.warn(`Skipping non-string field "${field}" (json_serialize is false).`);
            return;
        }
        encryptedFieldsPatch[field] = Object.assign(Object.assign({}, originalOptions), { type: Types.String, set: (value) => {
                if (value == null)
                    return value;
                const isString = typeof value === 'string';
                if (json_serialize && !isString) {
                    const serialized = JSON.stringify(value);
                    return encrypt(JSON_TAG + serialized);
                }
                return encrypt(value);
            }, get: (value) => {
                if (value == null)
                    return value;
                const decrypted = decrypt(value);
                if (json_serialize && decrypted.startsWith(JSON_TAG)) {
                    const stripped = decrypted.slice(JSON_TAG.length);
                    try {
                        return JSON.parse(stripped);
                    }
                    catch (err) {
                        console.warn('Failed to parse JSON-tagged decrypted value:', err);
                        return decrypted;
                    }
                }
                return decrypted;
            } });
    });
    schema.add(encryptedFieldsPatch);
    schema.set('toJSON', { getters: true });
    schema.set('toObject', { getters: true });
};
exports.default = applyEncryptedFields;
