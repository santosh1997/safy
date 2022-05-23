import { message } from "antd";
import ServiceConsumer from "../../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  ContentType,
  RequestType,
} from "../../../crosscutting/serviceconsumer/serviceConsumer.type";
import { ActionLink } from "./FileAction.style";

const FileAction = ({
  postAction,
  identifier,
  action,
  label,
  actionMessage,
}: {
  postAction: () => void;
  identifier: string;
  action: string;
  label: string;
  actionMessage: string;
}): JSX.Element => {
  const execute = async () => {
    const result = await ServiceConsumer.callJSONService<{ status: "Success" }>(
      {
        type: RequestType.GET,
        relativeURL: `/file/${action}/${identifier}`,
        authType: AuthType.PRIVATE,
        content: ContentType.JSON,
      }
    );
    if (result && result.status === "Success") {
      message.success(actionMessage);
      postAction();
    }
  };

  return <ActionLink onClick={execute}>{label}</ActionLink>;
};

export default FileAction;
