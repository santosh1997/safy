import { RowDataPacket } from "mysql2";

interface UserSessionDBO extends RowDataPacket {
  UserId: string;
  SessionId: string;
}

export { UserSessionDBO };
