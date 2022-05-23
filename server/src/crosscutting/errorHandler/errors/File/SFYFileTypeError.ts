import SFYError from "../SFYError";

class SFYFileTypeError extends SFYError {
  constructor() {
    super({
      name: "SFYFileTypeError",
      status: 400,
      message: "File type not supported",
    });
  }
}

export default SFYFileTypeError;
