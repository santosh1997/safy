import { History } from "history";
import { AUTH_TOKEN_STORAGE_KEY, LOGIN_PATH } from "./PrivateRoute.constant";

const withAuthentication = (
  component: JSX.Element,
  history: History
): JSX.Element | null => {
  const authToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || "";
  if (!authToken) {
    history.push(LOGIN_PATH);
    return null;
  }
  return component;
};

export default withAuthentication;
