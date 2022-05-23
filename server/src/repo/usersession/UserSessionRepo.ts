import SFYBaseRepo from "../base/SFYBaseRepo";
import { SFYBaseRepoProps } from "../base/SFYBaseRepo.type";
import { UserSessionDBO } from "./UserSession.types";
import { QueryError } from "mysql2";
import SFYUnauthorizedError from "../../crosscutting/errorHandler/errors/Authorization/SFYUnauthorizedError";
import SFYMySQLQueryError from "../../crosscutting/errorHandler/errors/MySQL/SFYMySQLQueryError";

class UserSessionRepo extends SFYBaseRepo {
  constructor(props: SFYBaseRepoProps) {
    super(props);
  }

  async create(email: string, password: string): Promise<UserSessionDBO> {
    try {
      const queryResult = await this.db.executeCommand<UserSessionDBO[][]>(
        {
          queryText: `CALL udsp_UserSession_Create(?, ?);`,
          queryParams: [email, password],
        },
        true
      );
      return queryResult.results[0][0];
    } catch (e) {
      if (e instanceof SFYMySQLQueryError && e.additionalData) {
        const errorData = JSON.parse(e.additionalData) as QueryError;
        if (errorData.errno === 1045)
          e = new SFYUnauthorizedError("Invalid Credentials", e.additionalData);
      }
      throw e;
    }
  }

  async get(id: string): Promise<UserSessionDBO> {
    try {
      const queryResult = await this.db.executeQuery<UserSessionDBO[]>(
        {
          queryText:
            "SELECT US.`Id` as `SessionId`, US.`UserId` FROM `UserSession` AS US INNER JOIN `User` AS U ON (US.`UserId` = U.`Id`) WHERE US.`Id` = ? AND (US.`LoggedOutOn` IS NULL OR US.`LoggedOutOn` > UTC_TIMESTAMP());",
          queryParams: [id],
        },
        false
      );

      if (queryResult.results && queryResult.results.length)
        return queryResult.results[0];
      else throw new SFYUnauthorizedError("Invalid Session");
    } catch (e) {
      throw e;
    }
  }
}

export default UserSessionRepo;
