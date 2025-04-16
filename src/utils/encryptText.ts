import { createCipheriv, randomBytes } from 'crypto';
import { BufferToString } from './bufferUtils';

const encryptText = (
  text: string,
  securityKey: Buffer = randomBytes(32),
  initVector: Buffer = randomBytes(16),
): string => {
  const algorithm: string = 'AES-256-GCM';

  // secret key generate 32 bytes of random data

  // the cipher function
  const cipher: any = createCipheriv(algorithm, securityKey, initVector);

  // encrypt the message
  // input encoding
  let encryptedData: any = cipher.update(text, 'utf-8', 'hex');

  encryptedData += cipher.final('hex');

  const authTag = cipher.getAuthTag();
  const finalData =
    encryptedData +
    '.' +
    BufferToString(securityKey) +
    '.' +
    BufferToString(initVector) +
    '.' +
    BufferToString(authTag);
  return finalData;
};
export default encryptText;
