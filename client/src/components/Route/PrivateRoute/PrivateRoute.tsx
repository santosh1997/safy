import { Route } from "react-router-dom";
import { RouteProps } from "../Route.type";
import withAuthentication from "./withAuthentication";
import { useHistory } from "react-router-dom";

const PrivateRoute = (props: RouteProps): JSX.Element => {
  const history = useHistory();
  return (
    <Route exact={props.exact} path={props.path}>
      {withAuthentication(props.component, history)}
    </Route>
  );
};

export default PrivateRoute;
