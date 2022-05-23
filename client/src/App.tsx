import Content from "./components/Content";
import Header from "./components/Header";
import { BrowserRouter, Switch } from "react-router-dom";
import "antd/dist/antd.min.css";
import Signin from "./components/Signin/Signin";
import AppRoute from "./components/Route";
import { LOGIN_PATH } from "./components/Route/PrivateRoute/PrivateRoute.constant";
import { RouteType } from "./components/Route/Route.type";
import { StyledContent, StyledLayout } from "./App.style";

const App = (): JSX.Element => {
  return (
    <StyledLayout>
      <BrowserRouter>
        <Header />
        <StyledContent className="site-layout-background">
          <Switch>
            <AppRoute
              exact
              path="/"
              component={<Content />}
              type={RouteType.PRIVATE}
            />
            <AppRoute
              path={LOGIN_PATH}
              component={<Signin />}
              type={RouteType.PUBLIC}
            />
          </Switch>
        </StyledContent>
      </BrowserRouter>
    </StyledLayout>
  );
};

export default App;
