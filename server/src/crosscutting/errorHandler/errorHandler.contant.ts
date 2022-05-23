import { SFYErrorResponse } from "./errorHandler.type";

const defaultErrorResponse: SFYErrorResponse = {
  status: 500,
  name: "SFYError",
  message: "Something went wrong. Please contact the administrator",
};

export { defaultErrorResponse };
