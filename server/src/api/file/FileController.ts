import { Request } from "express";
import FileService from "../../service/file/FileService";
import SFYBaseContoller from "../base/SFYBaseController";
import { SFYBaseControllerProps } from "../base/SFYBaseController.type";
import {
  FileDeleteResponseDTO,
  FileShareResponseDTO,
  FileUnshareResponseDTO,
  GetFilesResponseDTO,
  UploadResponseDTO,
} from "./FileController.type";
import Busboy from "busboy";
import { createWriteStream, createReadStream, unlink } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import Encryptor from "../../crosscutting/encryptor/encryptor";
import SFYInvalidFileError from "../../crosscutting/errorHandler/errors/File/SFYInvalidFileError";
import { FileResponse } from "../../crosscutting/router/SFYRouter/routes.type";
import {
  SupportedImageExtensions,
  SupportedVideoExtensions,
} from "./FileController.constants";
import { SFYFileType } from "../../repo/file/FileRepo.type";
import SFYFileTypeError from "../../crosscutting/errorHandler/errors/File/SFYFileTypeError";
import parseOrDefault, {
  valueType,
} from "../../crosscutting/utils/formatter/parseOrDefault";

class FileController extends SFYBaseContoller {
  fileService: FileService;

  constructor(props: SFYBaseControllerProps) {
    super(props);
    this.fileService = new FileService(this.serviceProps);
  }

  private getUploadPath(fileId: string): string {
    return path.join(__dirname, "../../../uploads/" + fileId);
  }

  private fileSaver(
    request: Request,
    postSaveOps: (name: string, key: string, type: SFYFileType) => void
  ): Busboy.Busboy {
    const busboy = Busboy({ headers: request.headers }),
      fileInfo = { name: "", key: "", type: SFYFileType.Any, uploaded: false };
    busboy.on(
      "file",
      async (name: string, file: Readable, info: { filename: string }) => {
        fileInfo.key = randomUUID();
        fileInfo.name = info.filename;
        fileInfo.type = this.getFileType(fileInfo.name);
        if (fileInfo.type === SFYFileType.Any)
          busboy.emit("error", new SFYFileTypeError());
        else {
          const filePath = this.getUploadPath(fileInfo.key),
            writableStream = createWriteStream(filePath);
          file.pipe(Encryptor.getCipher()).pipe(writableStream);
          fileInfo.uploaded = true;
        }
      }
    );
    busboy.on("close", async () => {
      await postSaveOps(fileInfo.name, fileInfo.key, fileInfo.type);
    });

    return busboy;
  }

  async upload(request: Request): Promise<UploadResponseDTO> {
    try {
      return new Promise((resolve, reject) => {
        request.pipe(
          this.fileSaver(request, async (name, key, type) => {
            if (name && key) {
              const result = await this.fileService.add(key, name, type);
              resolve({
                status: result,
              });
            } else reject(new SFYInvalidFileError());
          }).on("error", (error) => {
            if (error instanceof SFYFileTypeError) reject(error);
            else reject(new SFYInvalidFileError(error));
          })
        );
      });
    } catch (e) {
      throw e;
    }
  }

  private getFileType(fileName: string): SFYFileType {
    const extension = fileName.split(".").pop() || "";
    if (SupportedImageExtensions.includes(extension)) return SFYFileType.Image;
    if (SupportedVideoExtensions.includes(extension)) return SFYFileType.Video;
    return SFYFileType.Any;
  }

  private getFile(id: string): Readable {
    const filePath = this.getUploadPath(id),
      readableStream = createReadStream(filePath);
    return readableStream.pipe(Encryptor.getDecipher());
  }

  async download(request: Request): Promise<FileResponse> {
    try {
      if (!request.params.id || typeof request.params.id !== "string")
        throw new SFYInvalidFileError();
      const content = this.getFile(request.params.id),
        name = await this.fileService.getName(request.params.id);
      if (!name) throw new SFYInvalidFileError();
      return { content, fileName: name };
    } catch (e) {
      throw e;
    }
  }

  async downloadShared(request: Request): Promise<FileResponse> {
    try {
      if (!request.params.code || typeof request.params.code !== "string")
        throw new SFYInvalidFileError();

      const file = await this.fileService.getFileByKey(request.params.code);
      if (!file || !file.id || !file.name) throw new SFYInvalidFileError();
      const content = await this.getFile(file.id);
      return { content, fileName: file.name };
    } catch (e) {
      throw e;
    }
  }

  async get(request: Request<{}, {}, {}>): Promise<GetFilesResponseDTO> {
    try {
      return await this.fileService.get(
        parseOrDefault(
          request.query.type as string,
          SFYFileType.Any,
          valueType.INTEGER
        ),
        parseOrDefault(request.query.page as string, 0, valueType.INTEGER),
        parseOrDefault(request.query.pageSize as string, 10, valueType.INTEGER)
      );
    } catch (e) {
      throw e;
    }
  }

  async share(request: Request): Promise<FileShareResponseDTO> {
    try {
      if (!request.params.id || typeof request.params.id !== "string")
        throw new SFYInvalidFileError();
      const code = await this.fileService.share(request.params.id);
      return { status: "Success" };
    } catch (e) {
      throw e;
    }
  }

  async unshare(request: Request): Promise<FileUnshareResponseDTO> {
    try {
      if (!request.params.code || typeof request.params.code !== "string")
        throw new SFYInvalidFileError();
      const status = await this.fileService.unshare(request.params.code);
      return { status };
    } catch (e) {
      throw e;
    }
  }

  async delete(request: Request): Promise<FileDeleteResponseDTO> {
    try {
      if (!request.params.id || typeof request.params.id !== "string")
        throw new SFYInvalidFileError();
      return new Promise((resolve, reject) => {
        unlink(this.getUploadPath(request.params.id), (err) => {
          if (err) reject(new SFYInvalidFileError(err));
          this.fileService
            .delete(request.params.id)
            .then((status) => {
              resolve({ status });
            })
            .catch((e) => reject(e));
        });
      });
    } catch (e) {
      throw e;
    }
  }
}

export default FileController;
