import { RowDataPacket } from "mysql2";

enum SFYFileType {
  Any = -1,
  Image = 0,
  Video = 1,
}

interface FileCompositeDBO extends RowDataPacket {
  Id: string;
  Name: string;
  Code: string;
}

export { SFYFileType, FileCompositeDBO };
