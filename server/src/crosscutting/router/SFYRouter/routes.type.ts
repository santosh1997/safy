import { Request } from "express";
import { SFYBaseControllerProps } from "../../../api/base/SFYBaseController.type";
import { SFYAuthenticatorType } from "../../authenticator/authenticator.type";

interface SFYRouteProps<ResponseType, Response> {
  path: string;
  handler: SFYRouteHandler<ResponseType>;
  method: SFYRouteMethod;
  authType: SFYAuthenticatorType;
  responseType: Response;
}
type SFYRouteHandler<ResponseType> = (
  props: SFYBaseControllerProps,
  req: Request
) => Promise<ResponseType>;

type SFYRoute =
  | SFYRouteProps<{}, SFYResponseType.JSON>
  | SFYRouteProps<FileResponse, SFYResponseType.FILE>;

interface FileResponse {
  content: Buffer;
  fileName: string;
}

enum SFYRouteMethod {
  GET = "get",
  POST = "post",
}

enum SFYResponseType {
  JSON,
  FILE,
}

export {
  SFYRoute,
  SFYRouteMethod,
  SFYResponseType,
  SFYRouteHandler,
  FileResponse,
};
