import { createDecipheriv } from 'crypto';
import { StringToBuffer } from './bufferUtils';

const decryptText = (encryptedData: string): string => {
  const [encryptedText, securityKey, initVector, authTag]: string[] = encryptedData.split('.');
  // const initVector = 'aaaaaaaaaaaaaaaa';

  const algorithm: string = 'AES-256-GCM';

  // the decipher function
  const decipher: any = createDecipheriv(algorithm, StringToBuffer(securityKey), StringToBuffer(initVector));
  decipher.setAuthTag(StringToBuffer(authTag));
  const decryptedData: any = decipher.update(encryptedText, 'hex', 'utf-8');
  return decryptedData;
};
export default decryptText;
