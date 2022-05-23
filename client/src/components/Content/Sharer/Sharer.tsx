import { message } from "antd";
import { FileRecord } from "../Content.type";
import FileAction from "../FileAction/FileAction";
import { ShareLink } from "./Sharer.style";

const Sharer = ({
  record,
  resetData,
}: {
  record: FileRecord;
  resetData: () => void;
}): JSX.Element => {
  const shortURL = `${process.env.REACT_APP_CORE_API_BASE_URL}/f/${record.code}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL);
    message.success("URL copied to clipboard");
  };
  return (
    <>
      {record.code ? (
        <>
          <ShareLink onClick={copyToClipboard}>{shortURL}</ShareLink>
          {" | "}
          <FileAction
            action="unshare"
            label="Unshare"
            identifier={record.code}
            actionMessage="File unshared successfully"
            postAction={resetData}
          />
        </>
      ) : (
        <FileAction
          action="share"
          label="Share"
          identifier={record.id}
          actionMessage="File shared successfully"
          postAction={resetData}
        />
      )}
    </>
  );
};

export default Sharer;
