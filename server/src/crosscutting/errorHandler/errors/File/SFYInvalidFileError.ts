import SFYError from "../SFYError";

class SFYInvalidFileError extends SFYError {
  constructor(additionalData?: unknown) {
    super({
      name: "SFYInvalidFileError",
      status: 400,
      message: "Invalid file",
      additionalData: JSON.stringify(additionalData),
    });
  }
}

export default SFYInvalidFileError;
