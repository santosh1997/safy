export interface RouteProps {
  path: string;
  exact?: boolean;
  component: JSX.Element;
  type: RouteType;
}

enum RouteType {
  PUBLIC,
  PRIVATE,
}

export { RouteType };
