import { Col, message, Progress } from "antd";
import { useState } from "react";
import ServiceConsumer from "../../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  ContentType,
  RequestType,
} from "../../../crosscutting/serviceconsumer/serviceConsumer.type";
import {
  ProgressWrapper,
  StyledUpload,
  StyledUploadBtn,
} from "./FileUpload.style";

const FileUpload = ({
  postUpload,
}: {
  postUpload: () => void;
}): JSX.Element => {
  const [uploading, setUploading] = useState({ loading: false, progress: 0 });
  const upload = async (file: File) => {
    const payload = new FormData();
    payload.append("safefile", file);
    const progressInterval = progressor();
    const result = await ServiceConsumer.callJSONService<{ status: "Success" }>(
      {
        type: RequestType.POST,
        relativeURL: "/file",
        authType: AuthType.PRIVATE,
        content: ContentType.FORM_DATA,
        data: payload,
      }
    );
    clearInterval(progressInterval);
    if (result && result.status === "Success") {
      setProgress(100);
      message.success("File uploaded successfully");
      setTimeout(() => {
        setUploading({ loading: false, progress: 0 });
        postUpload();
      });
    } else setUploading({ loading: false, progress: 0 });
  };

  const progressor = (): NodeJS.Timer => {
    const progressInterval = setInterval(
      (() => {
        let progress = 0;
        return () => {
          progress++;
          if (progress < 100) setProgress(progress);
          else clearInterval(progressInterval);
        };
      })(),
      50
    );
    return progressInterval;
  };

  const setProgress = (progress: number): void => {
    setUploading({ loading: true, progress });
  };

  return (
    <>
      <Col span={2}>
        <StyledUpload
          showUploadList={false}
          beforeUpload={(file) => {
            upload(file);
            return false;
          }}
          disabled={uploading.loading}
        >
          <StyledUploadBtn loading={uploading.loading}>Upload</StyledUploadBtn>
        </StyledUpload>
      </Col>
      <Col span={4}>
        {uploading.loading ? (
          <ProgressWrapper>
            <Progress percent={uploading.progress} size="small" />
          </ProgressWrapper>
        ) : (
          <></>
        )}
      </Col>
      <Col span={6}></Col>
    </>
  );
};

export default FileUpload;
