const express = require("express");
const userRoute = express.Router();

const {
    getWks,
    getWksByProfileId,
    postWk,
    putWk,
    deleteWk,

} = require("../controllers/wksController");

    userRoute.get("/wks", getWks);
    userRoute.get("/wks/:id", getWksByProfileId);
    userRoute.post("/wk", postWk);
    userRoute.put("/wk/:id", putWk);
    userRoute.delete("/wk/:id", deleteWk);
module.exports = userRoute;