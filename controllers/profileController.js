const { con } = require("../configuration/connectDb");

{
  /** GET ALL THE Profiles */
}
const getProfiles = async (request, response) => {
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM student_profile", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.status(200).json({ profile: result });
      });
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting profile" });
  }
};

{
  /** GET Profile BY student_id */
}
const getOneProfileByName = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "SELECT * FROM student_profile WHERE `student_id`=? ",
        [user.student_id],
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ student: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting profile" });
  }
};

{
  /** GET A Profile BY student_ID */
}
const getOneProfileById = async (request, response) => {
  const id = request.params.id;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT * FROM student_profile WHERE student_id= ${id}`,
        function (err, result) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ profile: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting profile" });
  }
};

{
  /** ADD A Profile*/
}
const postProfile = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO student_profile SET ?",
        user,
        function (err, result, fields) {
          if (err) throw err;
          response
            .status(200)
            .json({ student: result, msg: " SUCCESS profile Added" });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding profile" });
  }
};

{
  /**UPDATE A Profile */
}
const putProfile = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    con.query(
      "UPDATE `student_profile` SET `location`=?,`mobilePhone`=?,`cv`=?,`opentoRemote`=?,`university`=?,`linkedinurl`=?,`emailurl`=?, `actualposition`=?, where `profile_id`=?",
      [ user.location, user.mobilePhone, user.cv, user.opentoRemote, user.university, user.linkedinurl, user.emailurl, user.actualposition, id],
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
  /**DELETE A Profile */
}
const deleteProfile = async (req, res) => {
  const id = req.params.id;
  try {
    con.query(
      "DELETE FROM `student_profile` WHERE `profile_id`=?",
      [id],
      function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({ msg: "delete done" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on deleting profile" });
  }

};

module.exports = {
  getProfiles,
  getOneProfileByName,
  getOneProfileById,
  postProfile,
  putProfile,
  deleteProfile,
};
