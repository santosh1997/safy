import { defaultErrorResponse } from "../../errorHandler.contant";
import SFYError from "../SFYError";

class SFYMySQLError extends SFYError {
  constructor(error: NodeJS.ErrnoException) {
    super({
      name: "SFYMySQLError",
      status: 500,
      message: defaultErrorResponse.message,
      additionalData: JSON.stringify(error),
    });
  }
}

export default SFYMySQLError;
