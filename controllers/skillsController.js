const { con } = require("../configuration/connectDb");

{
  /** GET ALL THE Skills */
}
const getSkills = async (request, response) => {
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM skill", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.status(200).json({ skills: result });
      });
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting skill" });
  }
};

{
  /** GET ALL SKILLS BY PROFILEID */
}
const getSkillsByProfileId = async (request, response) => {
  const id = request.params.id;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT * FROM skill WHERE profile_id= ${id}`,
        function (err, result) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ skills: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting skill" });
  }
};

{
  /** ADD A Skill*/
}
const postSkill = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO skill SET ?",
        user,
        function (err, result, fields) {
          if (err) throw err;
          response
            .status(200)
            .json({ skill: result, msg: " SUCCESS skill Added" });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding skill" });
  }
};

const putSkill = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(user);
    try {
      con.query(
        "UPDATE `skill` SET `rate`=?,`skill_name`=? where `skill_id`=?",
        [ user.rate, user.skill_name, id],
        function (err, result, fields) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
          res.status(200).json({ msg: "update sucess" });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "error on update profile" });
    }
  };

{
  /**DELETE A Skill */
}
const deleteSkill= async (req, res) => {
  const id = req.params.id;
  try {
    con.query(
      "DELETE FROM `skill` WHERE `skill_id`=?",
      [id],
      function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({ msg: "delete done" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on deleting skill" });
  }
};

module.exports = {
    getSkills,
    getSkillsByProfileId,
    postSkill,
    putSkill,
    deleteSkill,
};
