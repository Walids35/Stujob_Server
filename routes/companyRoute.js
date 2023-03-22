const express = require("express");
const userRoute = express.Router();

const {
  getCompanies,
  postCompany,
  putCompany,
  deleteCompany,
  getOneCompanyById,
  getOneCompanyByName,

} = require("../controllers/companiesController");

userRoute.get("/companies", getCompanies);
userRoute.get("/company", getOneCompanyByName);
userRoute.get("/company/:id", getOneCompanyById);
userRoute.post("/company", postCompany);
userRoute.put("/company/:id", putCompany);
userRoute.delete("/company/:id", deleteCompany);
module.exports = userRoute;