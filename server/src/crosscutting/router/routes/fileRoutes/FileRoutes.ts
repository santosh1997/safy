import FileController from "../../../../api/file/FileController";
import { SFYAuthenticatorType } from "../../../authenticator/authenticator.type";
import {
  SFYResponseType,
  SFYRouteMethod,
  SFYRoute,
} from "../../SFYRouter/routes.type";

const FileRoutes: SFYRoute[] = [
  {
    path: "/file",
    handler: (props, req) => new FileController(props).upload(req),
    method: SFYRouteMethod.POST,
    authType: SFYAuthenticatorType.PRIVATE,
    responseType: SFYResponseType.JSON,
  },
  {
    path: "/file/:id",
    handler: (props, req) => new FileController(props).download(req),
    method: SFYRouteMethod.GET,
    authType: SFYAuthenticatorType.PRIVATE,
    responseType: SFYResponseType.FILE,
  },
  {
    path: "/f/:code",
    handler: (props, req) => new FileController(props).downloadShared(req),
    method: SFYRouteMethod.GET,
    authType: SFYAuthenticatorType.PUBLIC,
    responseType: SFYResponseType.FILE,
  },
  {
    path: "/file",
    handler: (props, req) => new FileController(props).get(req),
    method: SFYRouteMethod.GET,
    authType: SFYAuthenticatorType.PRIVATE,
    responseType: SFYResponseType.JSON,
  },
  {
    path: "/file/share/:id",
    handler: (props, req) => new FileController(props).share(req),
    method: SFYRouteMethod.GET,
    authType: SFYAuthenticatorType.PRIVATE,
    responseType: SFYResponseType.JSON,
  },
  {
    path: "/file/unshare/:code",
    handler: (props, req) => new FileController(props).unshare(req),
    method: SFYRouteMethod.GET,
    authType: SFYAuthenticatorType.PRIVATE,
    responseType: SFYResponseType.JSON,
  },
  {
    path: "/file/delete/:id",
    handler: (props, req) => new FileController(props).delete(req),
    method: SFYRouteMethod.GET,
    authType: SFYAuthenticatorType.PRIVATE,
    responseType: SFYResponseType.JSON,
  },
];

export default FileRoutes;
