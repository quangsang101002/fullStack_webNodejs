import express from "express";
import homeController from "../controllers/homeController";
import useController from "../controllers/useController";

let route = express.Router();

let initWebRoutes = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/about", homeController.getAboutPage);
  route.get("/crud", homeController.getCRUD);

  route.post("/post-crud", homeController.postCRUD);
  route.get("/get-crud", homeController.displayGetCRUD);
  route.get("/edit-crud", homeController.getEditCRUD);

  route.post("/put-crud", homeController.putCRUD);
  route.get("/delete-crud", homeController.deleteCRUD);

  route.post("/api/login", useController.hanlelogin);
  route.get("/api/get-all-users", useController.hanleGetAllUsers);
  route.post("/api/create-new-user", useController.handleCreateNewUser);
  route.put("/api/edit-user", useController.handleEditUser);
  route.delete("/api/delete-user", useController.handleDeleteUser);

  return app.use("/", route);
};
export default initWebRoutes;
