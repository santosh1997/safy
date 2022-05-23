import { Request } from "express";
import { SFYBaseControllerProps } from "../../../api/base/SFYBaseController.type";
import UserSessionService from "../../../service/usersession/UserSessionService";
import Encryptor from "../../encryptor/encryptor";
import SFYUnauthorizedError from "../../errorHandler/errors/Authorization/SFYUnauthorizedError";
import { SFYAuthenticator, SFYUser } from "../authenticator.type";

const PrivateAuthenticator: SFYAuthenticator = (() => {
  const userSessionService = new UserSessionService({
    userContext: { userId: "{{__SYSTEM_USER__}}" },
  });
  const getUserDetails = async (req: Request): Promise<SFYUser> => {
    const authHeader = req.headers["authorization"] || "";
    if (!authHeader)
      throw new SFYUnauthorizedError("Authorization not provided");
    const sessionId = Encryptor.decrypt(authHeader);
    const userSession = await userSessionService.get(sessionId);
    return { userId: userSession.userId };
  };

  return async (req, callback) => {
    try {
      const userDetails = await getUserDetails(req);
      return callback({ userContext: userDetails });
    } catch (e) {
      throw e;
    }
  };
})();

export default PrivateAuthenticator;
