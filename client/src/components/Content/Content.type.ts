enum SPYFileType {
  Any = -1,
  Image = 0,
  Video = 1,
}

export interface FilesResponseDTO {
  records: FileRecord[];
  count: number;
}

export interface FileRecord {
  id: string;
  name: string;
  code: string;
}

export interface GridProps {
  pageSize: number;
  current: number;
}

export interface ColumnConfig {
  title: string;
  dataIndex: string;
  render?: (value: string, record: FileRecord) => JSX.Element;
}

export { SPYFileType };
