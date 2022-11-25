import express from "express";
import homeController from "../controllers/homeController";

let route = express.Router();

let initWebRoutes = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/about", homeController.getAboutPage);

  return app.use("/", route);
};
export default initWebRoutes;
