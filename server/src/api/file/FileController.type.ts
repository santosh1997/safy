import { SFYFileType } from "../../repo/file/FileRepo.type";

interface UploadResponseDTO {
  status: "Success";
}

interface GetFilesResponseDTO {
  records: { id: string; name: string; code: string }[];
  count: number;
}

interface FileShareResponseDTO {
  status: "Success";
}

interface FileUnshareResponseDTO {
  status: "Success";
}

interface FileDeleteResponseDTO {
  status: "Success";
}

export {
  UploadResponseDTO,
  GetFilesResponseDTO,
  FileShareResponseDTO,
  FileUnshareResponseDTO,
  FileDeleteResponseDTO,
};
