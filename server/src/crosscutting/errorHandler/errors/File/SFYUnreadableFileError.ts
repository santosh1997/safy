import { defaultErrorResponse } from "../../errorHandler.contant";
import SFYError from "../SFYError";

class SFYUnreadableFileError extends SFYError {
  constructor(additionalData?: unknown) {
    super({
      name: "SFYUnreadableFileError",
      status: 500,
      message: `${defaultErrorResponse.message}`,
      additionalData: JSON.stringify(additionalData),
    });
  }
}

export default SFYUnreadableFileError;
