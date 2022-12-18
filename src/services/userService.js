import db from "../modules/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      // console.log("isExit", isExist);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          raw: true,
          where: { email: email },
        });
        // console.log("user", user);
        if (user) {
          //compare password
          let check = bcrypt.compareSync(password, user.password);
          // console.log("check", check);
          // let check = true;
          if (check) {
            (userData.errCode = 0),
              (userData.errMessage = "OK"),
              delete user.password;
            userData.user = user;
          } else {
            (userData.errCode = 3), (userData.errMessage = "Wrong password");
          }
        } else {
          (userData.errCode = 2), (userData.errMessage = `Use's not found`);
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email is't exist in your System, Plx try email other`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (app) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(app.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "email của bạn đã được sử dụng",
        });
      } else {
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
        resolve({
          errCode: 0,
          message: "OK ",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        message: "The user exit's",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });

    resolve({
      errCode: 0,
      message: " The user deleted",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        resolve({
          errCode: 0,
          message: "update the user Succeseds",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "err notFound",
        });
      }
      await db.User.update();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin,
  checkUserEmail,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
