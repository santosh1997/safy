import express, { Request, Response } from "express";
import compression from "compression";

const Compressor: express.RequestHandler = ((): express.RequestHandler => {
  const shouldCompress = (req: Request, res: Response) => {
    if (req.headers["sfy-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  };
  return compression({ filter: shouldCompress });
})();

export default Compressor;
