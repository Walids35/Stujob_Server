const express = require("express");
const userRoute = express.Router();

const {
  getProfiles,
  postProfile,
  putProfile,
  deleteProfile,
  getOneProfileById,
  getOneProfileByName,

} = require("../controllers/profileController");

userRoute.get("/profiles", getProfiles);
userRoute.get("/profile", getOneProfileByName);
userRoute.get("/profile/:id", getOneProfileById);
userRoute.post("/profile", postProfile);
userRoute.put("/profile/:id", putProfile);
userRoute.delete("/profile/:id", deleteProfile);
module.exports = userRoute;