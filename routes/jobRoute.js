const express = require("express");
const userRoute = express.Router();

const {
  getJobs,
  postJob,
  putJob,
  deleteJob,
  getOneJobById,
  getOneJobByName,

} = require("../controllers/jobsController");

userRoute.get("/jobs", getJobs);
userRoute.get("/job", getOneJobByName);
userRoute.get("/job/:id", getOneJobById);
userRoute.post("/job", postJob);
userRoute.put("/job/:id", putJob);
userRoute.delete("/job/:id", deleteJob);
module.exports = userRoute;