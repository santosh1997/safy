import UserSessionController from "../../../../api/usersession/UserSessionContoller";
import { SFYAuthenticatorType } from "../../../authenticator/authenticator.type";
import {
  SFYResponseType,
  SFYRouteMethod,
  SFYRoute,
} from "../../SFYRouter/routes.type";

const UserSessionRoutes: SFYRoute[] = [
  {
    path: "/auth/signin",
    handler: (props, req) => new UserSessionController(props).signIn(req),
    method: SFYRouteMethod.POST,
    authType: SFYAuthenticatorType.PUBLIC,
    responseType: SFYResponseType.JSON,
  },
  {
    path: "/auth/safesignin",
    handler: (props, req) => new UserSessionController(props).safeSignIn(req),
    method: SFYRouteMethod.POST,
    authType: SFYAuthenticatorType.PUBLIC,
    responseType: SFYResponseType.JSON,
  },
];

export default UserSessionRoutes;
