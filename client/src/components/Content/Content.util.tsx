import { ColumnConfig, FileRecord } from "./Content.type";
import Downloader from "./Downloader/Downloader";
import FileAction from "./FileAction/FileAction";
import Sharer from "./Sharer/Sharer";

const getColumnConfig = (resetData: () => void) => {
  const columns: ColumnConfig[] = [
    {
      title: "File",
      dataIndex: "name",
    },
    {
      title: "Sharing",
      dataIndex: "code",
      render: (value: string, record: FileRecord) => (
        <Sharer record={record} resetData={resetData} />
      ),
    },
    {
      title: "Download",
      dataIndex: "download",
      render: (value: string, record: FileRecord) => (
        <Downloader id={record.id} />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (value: string, record: FileRecord) => (
        <FileAction
          action="delete"
          label="Delete"
          identifier={record.id}
          actionMessage="File deleted successfully"
          postAction={resetData}
        />
      ),
    },
  ];
  return columns;
};

export { getColumnConfig };
