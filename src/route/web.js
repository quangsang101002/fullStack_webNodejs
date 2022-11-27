import express from "express";
import homeController from "../controllers/homeController";

let route = express.Router();

let initWebRoutes = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/about", homeController.getAboutPage);
  route.get("/crud", homeController.getCRUD);

  route.post("/post-crud", homeController.postCRUD);
  route.get("/get-crud", homeController.displayGetCRUD);
  route.get("/edit-crud", homeController.getEditCRUD);
  // route.get("/delete-crud", homeController.getDeleteCRUD);

  return app.use("/", route);
};
export default initWebRoutes;
