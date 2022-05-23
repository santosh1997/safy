import { defaultErrorResponse } from "./errorHandler.contant";
import { SFYErrorResponse } from "./errorHandler.type";
import SFYError from "./errors/SFYError";

const handleSFYError = (e: SFYError) => {
  console.error(`[SFY_ERROR:${e.name}:${e.message}]`, {
    stack: e.stack,
    additionalData: e.additionalData,
  });
  return e.getErrorResponse();
};

const errorHandler = (e: unknown): SFYErrorResponse => {
  if (e instanceof Error) {
    if (e instanceof SFYError) return handleSFYError(e);

    console.error(`[SYSTEM_ERROR:${e.name}:${e.message}]`, {
      stack: e.stack,
    });
    return {
      status: defaultErrorResponse.status,
      name: e.name,
      message: defaultErrorResponse.message,
    };
  } else return defaultErrorResponse;
};

export default errorHandler;
