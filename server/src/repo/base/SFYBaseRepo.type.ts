import { SFYUser } from "../../crosscutting/authenticator/authenticator.type";
import { RowDataPacket } from "mysql2";

interface SFYBaseRepoProps {
  userContext: SFYUser;
}

interface RowCountDBO extends RowDataPacket {
  Count: number;
}

export { SFYBaseRepoProps, RowCountDBO };
