"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToBuffer = exports.BufferToString = void 0;
const BufferToString = (buffer) => {
    return buffer.toString('base64');
};
exports.BufferToString = BufferToString;
const StringToBuffer = (string) => {
    return Buffer.from(string, 'base64');
};
exports.StringToBuffer = StringToBuffer;
