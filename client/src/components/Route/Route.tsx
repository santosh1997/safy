import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import { RouteProps, RouteType } from "./Route.type";

const AppRoute = (props: RouteProps): JSX.Element => {
  return props.type === RouteType.PRIVATE ? (
    <PrivateRoute {...props} />
  ) : (
    <PublicRoute {...props} />
  );
};

export default AppRoute;
