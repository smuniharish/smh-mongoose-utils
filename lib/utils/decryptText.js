"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const bufferUtils_1 = require("./bufferUtils");
const decryptText = (encryptedData) => {
    const [encryptedText, securityKey, initVector, authTag] = encryptedData.split('.');
    // const initVector = 'aaaaaaaaaaaaaaaa';
    const algorithm = 'AES-256-GCM';
    // the decipher function
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, (0, bufferUtils_1.StringToBuffer)(securityKey), (0, bufferUtils_1.StringToBuffer)(initVector));
    decipher.setAuthTag((0, bufferUtils_1.StringToBuffer)(authTag));
    const decryptedData = decipher.update(encryptedText, 'hex', 'utf-8');
    return decryptedData;
};
exports.default = decryptText;
