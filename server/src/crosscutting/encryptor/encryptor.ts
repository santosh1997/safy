import crypto from "crypto";
import { getEnvVar } from "../processor";
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

  getCipher(): crypto.Cipher {
    return crypto.createCipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );
  }

  getDecipher(): crypto.Cipher {
    return crypto.createDecipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
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
