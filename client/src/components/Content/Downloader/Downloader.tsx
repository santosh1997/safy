import { Progress } from "antd";
import { useState } from "react";
import ServiceConsumer from "../../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  ContentType,
  RequestType,
} from "../../../crosscutting/serviceconsumer/serviceConsumer.type";
import { DownloadLink, ProgressWrapper } from "./Downloader.style";

const Downloader = ({ id }: { id: string }): JSX.Element => {
  const [state, setState] = useState({
    showProgress: false,
    progress: 0,
  });
  const setProgress = (progress: number) => {
    setState({ progress, showProgress: true });
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

  const download = () => {
    const progressInterval = progressor();
    ServiceConsumer.callBLOBService({
      type: RequestType.GET,
      relativeURL: `/file/${id}`,
      authType: AuthType.PRIVATE,
      content: ContentType.JSON,
    }).then((file) => {
      clearInterval(progressInterval);
      if (file) {
        setProgress(100);
        setTimeout(() => {
          const encodedUri = window.URL.createObjectURL(file.content);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", file.fileName);
          link.click();
          setState({
            showProgress: false,
            progress: 0,
          });
        });
      } else
        setState({
          showProgress: false,
          progress: 0,
        });
    });
  };

  return (
    <>
      {state.showProgress ? (
        <ProgressWrapper>
          <Progress percent={state.progress} size="small" />
        </ProgressWrapper>
      ) : (
        <DownloadLink onClick={download}>Download</DownloadLink>
      )}
    </>
  );
};

export default Downloader;
