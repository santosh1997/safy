import crypto from "crypto";
import { Readable } from "stream";
import { getEnvVar } from "../processor";
import getBufferFromStream from "../utils/convertor/streamToBuffer";
import { AESConfig } from "./encryptor.constants";
class Encrypt {
  private RSAPrivateKey: crypto.KeyObject;
  constructor() {
    this.RSAPrivateKey = crypto.createPrivateKey({
      key: Buffer.from(getEnvVar("RSA_PRIVATE_KEY"), "base64"),
      format: "der",
      type: "pkcs1",
    });
  }

  private formatCipher(
    cipher: crypto.Cipher,
    data: string,
    inputFormat: crypto.Encoding,
    outputFormat: crypto.Encoding
  ): string {
    return (
      cipher.update(data, inputFormat, outputFormat) +
      cipher.final(outputFormat)
    );
  }

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );

    return this.formatCipher(
      cipher,
      data,
      AESConfig.cipherFormat,
      AESConfig.outputFormat
    );
  }

  async encryptFile(file: Readable): Promise<Buffer> {
    const cipher = crypto.createCipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );
    const fileBuffer = await getBufferFromStream(file);
    return Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  }

  async decryptFile(file: Readable): Promise<Buffer> {
    const decipher = crypto.createDecipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );
    const fileBuffer = await getBufferFromStream(file);
    return Buffer.concat([decipher.update(fileBuffer), decipher.final()]);
  }

  decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );

    return this.formatCipher(
      decipher,
      encryptedData,
      AESConfig.outputFormat,
      AESConfig.cipherFormat
    );
  }

  decryptClientEncryption(encryptedData: string): string {
    return crypto
      .privateDecrypt(
        {
          key: this.RSAPrivateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(encryptedData, "base64")
      )
      .toString();
  }
}

const Encryptor = new Encrypt();
export default Encryptor;
