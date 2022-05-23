import { Express } from "express";
import Compressor from "./compressor";

const attachCompressor = (app: Express) => {
  try {
    app.use(Compressor);
  } catch (e) {
    throw e;
  }
};

export { attachCompressor };
