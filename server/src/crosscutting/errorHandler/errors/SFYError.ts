import { SFYErrorResponse } from "../errorHandler.type";
import { SFYErrorInitializerProps } from "./SFYError.type";

class SFYError extends Error {
  status: number;
  additionalData?: string;

  constructor(props: SFYErrorInitializerProps) {
    super(props.message);
    this.status = props.status || 500;
    this.name = props.name || "SFYError";
    this.additionalData = props.additionalData;
  }

  getErrorResponse(): SFYErrorResponse {
    return {
      status: this.status,
      name: this.name,
      message: this.message,
    };
  }
}

export default SFYError;
