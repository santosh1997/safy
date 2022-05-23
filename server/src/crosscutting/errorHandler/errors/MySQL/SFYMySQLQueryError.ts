import { defaultErrorResponse } from "../../errorHandler.contant";
import SFYError from "../SFYError";
import mysql from "mysql2";

class SFYMySQLQueryError extends SFYError {
  constructor(error: mysql.QueryError) {
    super({
      name: "SFYMySQLQueryError",
      status: 500,
      message: defaultErrorResponse.message,
      additionalData: JSON.stringify(error),
    });
  }
}

export default SFYMySQLQueryError;
