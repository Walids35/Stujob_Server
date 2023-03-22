const express = require("express");
const userRoute = express.Router();

const {
    getSkills,
    getSkillsByProfileId,
    postSkill,
    putSkill,
    deleteSkill,

} = require("../controllers/skillsController");

    userRoute.get("/skills", getSkills);
    userRoute.get("/skills/:id", getSkillsByProfileId);
    userRoute.post("/skill", postSkill);
    userRoute.put("/skill/:id", putSkill);
    userRoute.delete("/skill/:id", deleteSkill);
module.exports = userRoute;