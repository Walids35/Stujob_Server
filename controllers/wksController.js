const { con } = require("../configuration/connectDb");

{
  /** GET ALL THE work experiences */
}
const getWks = async (request, response) => {
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM workexperience", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.status(200).json({ workexperience: result });
      });
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting workexperience" });
  }
};

{
  /** GET ALL workexperiences BY PROFILEID */
}
const getWksByProfileId = async (request, response) => {
  const id = request.params.id;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT * FROM workexperience WHERE profile_id= ${id}`,
        function (err, result) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ workexperiences: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting workexperience" });
  }
};

{
  /** ADD A workexperience*/
}
const postWk = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO workexperience SET ?",
        user,
        function (err, result, fields) {
          if (err) throw err;
          response
            .status(200)
            .json({ workexperience: result, msg: " SUCCESS workexperience Added" });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding workexperience" });
  }
};

const putWk = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(user);
    try {
      con.query(
        "UPDATE `workexperience` SET `date_from`=?,`date_to`=?,`title`=?,`description`=?,`location`=?,`company`=?, where `wk_id`=?",
        [ user.date_from, user.date_to, nouser.title, user.description, user.location, user.company, id],
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
const deleteWk= async (req, res) => {
  const id = req.params.id;
  try {
    con.query(
      "DELETE FROM `workexperience` WHERE `wk_id`=?",
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
    getWks,
    getWksByProfileId,
    postWk,
    putWk,
    deleteWk,
};
