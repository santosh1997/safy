import { Readable } from "node:stream";

const getBufferFromStream = async (readable: Readable): Promise<Buffer> => {
  const chunks = [];
  for await (let chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export default getBufferFromStream;
