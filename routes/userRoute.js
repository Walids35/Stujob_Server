const express = require("express");
const userRoute = express.Router();

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUserById,
  getOneUserByName,
  register,
  login

} = require("../controllers/usersController");

userRoute.get("/users", getUsers);
userRoute.get("/user", getOneUserByName);
userRoute.get("/user/:id", getOneUserById);
userRoute.post("/user", postUser);
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.put("/user/:id", putUser);
userRoute.delete("/user/:id", deleteUser);
module.exports = userRoute;
