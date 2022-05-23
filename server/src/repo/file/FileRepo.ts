import { QueryError, RowDataPacket } from "mysql2";
import SFYMySQLQueryError from "../../crosscutting/errorHandler/errors/MySQL/SFYMySQLQueryError";
import SFYError from "../../crosscutting/errorHandler/errors/SFYError";
import SFYBaseRepo from "../base/SFYBaseRepo";
import { RowCountDBO, SFYBaseRepoProps } from "../base/SFYBaseRepo.type";
import { FileCompositeDBO, SFYFileType } from "./FileRepo.type";

class FileRepo extends SFYBaseRepo {
  constructor(props: SFYBaseRepoProps) {
    super(props);
  }

  async add(key: string, name: string, type: SFYFileType): Promise<"Success"> {
    try {
      const queryResult = await this.db.executeCommand<RowDataPacket[][]>(
        {
          queryText:
            "INSERT INTO `File` (`Id`, `Name`, `Type`, `CreatedBy`) VALUES (?, ?, ?, ?);",
          queryParams: [key, name, type, this.props.userContext.userId],
        },
        false
      );
      return "Success";
    } catch (e) {
      throw e;
    }
  }

  async getName(id: string): Promise<string> {
    try {
      const queryResult = await this.db.executeQuery<RowDataPacket[]>(
        {
          queryText:
            "SELECT `Name` FROM `File` WHERE `Id`= ? AND `CreatedBy`= ?;",
          queryParams: [id, this.props.userContext.userId],
        },
        false
      );
      return queryResult.results &&
        queryResult.results[0] &&
        queryResult.results[0].Name
        ? queryResult.results[0].Name
        : "";
    } catch (e) {
      throw e;
    }
  }

  async getNameByKey(
    key: string
  ): Promise<{ name: string; id: string } | null> {
    try {
      const queryResult = await this.db.executeQuery<RowDataPacket[]>(
        {
          queryText:
            "SELECT `F`.`Id`, `Name` FROM `File` as `F` INNER JOIN `FileShare` as `FS` ON `F`.`Id` = `FS`.`FileId` WHERE `Code`= ?;",
          queryParams: [key],
        },
        false
      );
      return queryResult.results &&
        queryResult.results[0] &&
        queryResult.results[0].Id
        ? { id: queryResult.results[0].Id, name: queryResult.results[0].Name }
        : null;
    } catch (e) {
      throw e;
    }
  }

  async get(
    type: SFYFileType,
    page: number,
    pageSize: number
  ): Promise<{ records: FileCompositeDBO[]; count: number }> {
    try {
      const queryResult = await this.db.executeQuery<
        (FileCompositeDBO | RowCountDBO)[][]
      >(
        {
          queryText: `CALL udsp_Files_Retrieve(?, ?, ?);`,
          queryParams: [type, (page - 1) * pageSize, pageSize],
        },
        true
      );
      return {
        records: queryResult.results[0] as FileCompositeDBO[],
        count: (queryResult.results[1] as RowCountDBO[])[0].Count,
      };
    } catch (e) {
      throw e;
    }
  }

  async share(id: string, code: string): Promise<"Success"> {
    try {
      const queryResult = await this.db.executeCommand<RowDataPacket[][]>(
        {
          queryText:
            "INSERT INTO `FileShare` (`Code`, `FileId`) VALUES (?, ?);",
          queryParams: [code, id],
        },
        false
      );
      return "Success";
    } catch (e) {
      throw e;
    }
  }

  async unshare(code: string): Promise<"Success"> {
    try {
      const queryResult = await this.db.executeCommand<RowDataPacket[][]>(
        {
          queryText: "DELETE FROM `FileShare` WHERE `Code` = ?;",
          queryParams: [code],
        },
        false
      );
      return "Success";
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<"Success"> {
    try {
      const queryResult = await this.db.executeCommand<RowDataPacket[][]>(
        {
          queryText: "DELETE FROM `File` WHERE `Id` = ?;",
          queryParams: [id],
        },
        false
      );
      return "Success";
    } catch (e) {
      throw e;
    }
  }
}

export default FileRepo;
