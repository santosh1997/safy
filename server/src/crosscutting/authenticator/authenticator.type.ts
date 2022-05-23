import { Request } from "express";
import { PassThrough } from "node:stream";
import { SFYBaseControllerProps } from "../../api/base/SFYBaseController.type";
import { SFYResponseType } from "../router/SFYRouter/routes.type";

interface SFYAuthenticatedRequest extends Request {
  ServiceUser: SFYUser;
}

interface SFYUser {
  userId: string;
}

type SFYAuthenticator = <Response>(
  req: Request,
  callback: (baseControllerProps: SFYBaseControllerProps) => Response
) => Promise<Response>;

type SFYAuthenticatorCallback = <Response>(
  baseControllerProps: SFYBaseControllerProps
) => Response;

enum SFYAuthenticatorType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export {
  SFYAuthenticatedRequest,
  SFYUser,
  SFYAuthenticator,
  SFYAuthenticatorType,
};
