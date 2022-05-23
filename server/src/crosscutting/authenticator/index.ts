import { SFYAuthenticatorType } from "./authenticator.type";
import PrivateAuthenticator from "./privateAuthenticator/PrivateAuthenticator";
import PublicAuthenticator from "./publicAuthenticator/PublicAuthenticator";

const Authenticator = {
  [SFYAuthenticatorType.PUBLIC]: PublicAuthenticator,
  [SFYAuthenticatorType.PRIVATE]: PrivateAuthenticator,
};

export default Authenticator;
