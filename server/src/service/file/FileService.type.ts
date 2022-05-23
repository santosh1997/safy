import { FileCompositeDBO } from "../../repo/file/FileRepo.type";

class FileComposite {
  id: string;
  name: string;
  code: string;

  constructor(dbo: FileCompositeDBO) {
    this.id = dbo.Id;
    this.name = dbo.Name;
    this.code = dbo.Code;
  }
}

export { FileComposite };
