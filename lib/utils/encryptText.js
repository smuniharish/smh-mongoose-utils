"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const bufferUtils_1 = require("./bufferUtils");
const encryptText = (text, securityKey = (0, crypto_1.randomBytes)(32), initVector = (0, crypto_1.randomBytes)(16)) => {
    const algorithm = 'AES-256-GCM';
    // secret key generate 32 bytes of random data
    // the cipher function
    const cipher = (0, crypto_1.createCipheriv)(algorithm, securityKey, initVector);
    // encrypt the message
    // input encoding
    let encryptedData = cipher.update(text, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    const finalData = encryptedData +
        '.' +
        (0, bufferUtils_1.BufferToString)(securityKey) +
        '.' +
        (0, bufferUtils_1.BufferToString)(initVector) +
        '.' +
        (0, bufferUtils_1.BufferToString)(authTag);
    return finalData;
};
exports.default = encryptText;
