import { JSEncrypt } from "jsencrypt";
class Encrypt {
  private encryptor;
  constructor() {
    this.encryptor = new JSEncrypt();
    this.encryptor.setPublicKey(`-----BEGIN PUBLIC KEY-----
    ${process.env.REACT_APP_RSA_PUBLIC_KEY || ""} -----END PUBLIC KEY-----`);
  }

  encrypt(data: string): string {
    return this.encryptor.encrypt(data) || "";
  }
}

const Encryptor = new Encrypt();
export default Encryptor;
