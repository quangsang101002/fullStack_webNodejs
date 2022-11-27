import bcrypt from "bcryptjs";
import db from "../modules/index";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (app) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWordFromBcrypt = await hashUserPassword(app.password);
      await db.User.create({
        email: app.email,
        password: hashPassWordFromBcrypt,
        firstName: app.firstname,
        lastName: app.lastname,
        address: app.address,
        phonenumber: app.phonenumber,
        gender: app.gender === "1" ? true : false,
        roleId: app.roleId,
      });
      resolve("Ok! create a user the successed");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        raw: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser,
  getAllUser,
};
