import { Express } from "express";
import SFYRouter from "./SFYRouter/SFYRouter";

const attachRouter = (app: Express) => {
  try {
    const router = new SFYRouter();
    app.use(router.expressRouterInstance);
  } catch (e) {
    throw e;
  }
};

export { attachRouter };
