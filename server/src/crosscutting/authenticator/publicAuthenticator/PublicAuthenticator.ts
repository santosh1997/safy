import { SFYAuthenticator, SFYUser } from "../authenticator.type";

const PublicAuthenticator: SFYAuthenticator = (() => {
  return async (req, callback) => {
    const userDetails: SFYUser = { userId: "{{__SYSTEM_USER__}}" };
    return callback({ userContext: userDetails });
  };
})();

export default PublicAuthenticator;
