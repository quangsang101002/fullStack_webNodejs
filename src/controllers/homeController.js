import db from "../modules/index";
import CRUDservice from "../services/CRUDservice";
import sequelize from "../config/connectDB";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.send("hello world about");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  console.log(req.body);
  const user = await CRUDservice.createNewUser(req.body);
  return res.redirect("/get-crud");
};
let displayGetCRUD = async (req, res) => {
  const data = await CRUDservice.getAllUser();

  return res.render("displayCRUD.ejs", { dataTable: data });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId);
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("Not found a user!</h2>");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDservice.updateUserData(data);
  return res.render("displayCRUD.ejs", { dataTable: allUsers });
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDservice.deleteUserById(id);
    return res.redirect("/get-crud");
  } else {
    return res.send("Not found user");
  }
};
module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
