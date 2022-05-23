import { getEnvVar } from "../processor";
import crypto from "crypto";

const AESConfig = {
  name: "aes-256-cbc",
  key: Buffer.from(getEnvVar("AES_KEY"), "hex"),
  initVector: Buffer.from(getEnvVar("AES_INIT_VECTOR"), "hex"),
  cipherFormat: "utf-8" as crypto.Encoding,
  outputFormat: "hex" as crypto.Encoding,
};

export { AESConfig };
