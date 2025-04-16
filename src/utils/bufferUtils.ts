const BufferToString = (buffer: Buffer): string => {
  return buffer.toString('base64');
};
const StringToBuffer = (string: string): Buffer => {
  return Buffer.from(string, 'base64');
};
export { BufferToString, StringToBuffer };
