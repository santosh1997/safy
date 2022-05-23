import { Request, Router } from "express";
import { Stream } from "node:stream";
import Authenticator from "../../authenticator";
import { SFYAuthenticatorType } from "../../authenticator/authenticator.type";
import errorHandler from "../../errorHandler/errorHandler";
import Routes from "../routes";
import { SFYResponseType, SFYRoute, SFYRouteHandler } from "./routes.type";

class SFYRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.loadRoutes();
  }

  get expressRouterInstance(): Router {
    return this.router;
  }

  private async invokeAuthenticatedCallback<ResponseType>(
    req: Request,
    authType: SFYAuthenticatorType,
    handler: SFYRouteHandler<Awaited<ResponseType>>
  ): Promise<Awaited<ResponseType>> {
    const result = await Authenticator[authType]<ReturnType<typeof handler>>(
      req,
      (baseControllerProps) => {
        return handler(baseControllerProps, req);
      }
    );
    return result;
  }

  private addRoute(props: SFYRoute) {
    this.router[props.method](props.path, async (req, res) => {
      try {
        if (props.responseType === SFYResponseType.JSON) {
          const result = await this.invokeAuthenticatedCallback<
            ReturnType<typeof props.handler>
          >(req, props.authType, props.handler);
          res.json(result);
        } else {
          const result = await this.invokeAuthenticatedCallback<
            ReturnType<typeof props.handler>
          >(req, props.authType, props.handler);
          res.set(
            "Content-disposition",
            "attachment; filename=" + result.fileName
          );
          res.set("Content-Type", "application/octet-stream");
          result.content.pipe(res);
        }
      } catch (e) {
        const errorResponse = errorHandler(e);
        res.set("Connection", "close").status(errorResponse.status).json({
          name: errorResponse.name,
          message: errorResponse.message,
        });
      }
    });
  }

  private loadRoutes(): void {
    Routes.forEach((route) => {
      this.addRoute(route);
    });
  }
}

export default SFYRouter;
