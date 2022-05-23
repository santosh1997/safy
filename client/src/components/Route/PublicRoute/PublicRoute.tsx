import { Route } from "react-router-dom";
import { RouteProps } from "../Route.type";

const PublicRoute = (props: RouteProps): JSX.Element => {
  return (
    <Route exact={props.exact} path={props.path}>
      {props.component}
    </Route>
  );
};

export default PublicRoute;
