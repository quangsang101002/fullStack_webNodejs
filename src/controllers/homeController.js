import db from "../modules/index";
import CRUDservice from "../services/CRUDservice";

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
  console.log(user);
  return res.send("Cộng hòa xã hội chủ nghĩa Việt Nam độc lập tự do hạnh phúc");
};
let displayGetCRUD = async (req, res) => {
  console.log("---------------------------");
  const data = await CRUDservice.getAllUser();
  console.log(data);
  console.log("--------------------------");
  return res.render("displayCRUD.ejs", { dataTable: data });
};
let getEditCRUD = (req, res) => {
  console.log(req.query.id);
  return res.send("Test return id");
};
module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
};
