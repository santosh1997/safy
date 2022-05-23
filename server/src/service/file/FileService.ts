import FileRepo from "../../repo/file/FileRepo";
import SFYBaseService from "../base/SFYBaseService";
import { SFYBaseServiceProps } from "../base/SFYBaseService.type";
import { FileComposite } from "./FileService.type";
import { SFYFileType } from "../../repo/file/FileRepo.type";

class FileService extends SFYBaseService {
  fileRepo: FileRepo;

  constructor(props: SFYBaseServiceProps) {
    super(props);
    this.fileRepo = new FileRepo(this.repoProps);
  }

  async add(key: string, name: string, type: SFYFileType): Promise<"Success"> {
    return this.fileRepo.add(key, name, type);
  }

  async getName(id: string): Promise<string> {
    return this.fileRepo.getName(id);
  }

  async getFileByKey(
    key: string
  ): Promise<{ name: string; id: string } | null> {
    return this.fileRepo.getNameByKey(key);
  }

  async get(
    type: SFYFileType,
    page: number,
    pageSize: number
  ): Promise<{ records: FileComposite[]; count: number }> {
    const resultDBO = await this.fileRepo.get(type, page, pageSize);
    return {
      records: resultDBO.records.map((record) => new FileComposite(record)),
      count: resultDBO.count,
    };
  }

  async share(id: string): Promise<string> {
    const code = Math.random().toString(36).slice(7);
    await this.fileRepo.share(id, code);
    return code;
  }

  async unshare(code: string): Promise<"Success"> {
    return this.fileRepo.unshare(code);
  }

  async delete(id: string): Promise<"Success"> {
    return this.fileRepo.delete(id);
  }
}

export default FileService;
