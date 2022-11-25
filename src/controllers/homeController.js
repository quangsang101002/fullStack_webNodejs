import db from "../modules/index";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homePage.ejs", { dataUser: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.send("hello world about");
};
module.exports = {
  getHomePage,
  getAboutPage,
};
