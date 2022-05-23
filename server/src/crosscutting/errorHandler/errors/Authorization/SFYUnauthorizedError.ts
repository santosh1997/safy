import SFYError from "../SFYError";

class SFYUnauthorizedError extends SFYError {
  constructor(message: string, additionalData?: string) {
    super({
      name: "SFYUnauthorizedError",
      status: 401,
      message: message,
      additionalData: additionalData,
    });
  }
}

export default SFYUnauthorizedError;
