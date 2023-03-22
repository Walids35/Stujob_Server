const { con } = require("../configuration/connectDb");

{
  /** GET ALL THE jobs */
}
const getJobs = async (request, response) => {
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM job", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.status(200).json({ job: result });
      });
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting job" });
  }
};

{
  /** GET job BY company_id */
}
const getOneJobByName = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "SELECT * FROM job WHERE `company_id`=? ",
        [user.job_id],
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ student: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting job" });
  }
};

{
  /** GET A job BY ID */
}
const getOneJobById = async (request, response) => {
  const id = request.params.id;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT * FROM student WHERE job_id= ${id}`,
        function (err, result) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ job: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting job" });
  }
};

{
  /** ADD A job*/
}
const postJob = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO job SET ?",
        user,
        function (err, result, fields) {
          if (err) throw err;
          response
            .status(200)
            .json({ student: result, msg: " SUCCESS job Added" });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding job" });
  }
};

{
  /**UPDATE A job */
}
const putJob = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    con.query(
      "UPDATE `profile` SET `status`=?,`roleOverview`=?,`hoursPerWeek`=?,`description`=?,`expire`=?, where `profile_id`=?",
      [ user.status, user.roleOverview, user.hoursPerWeek, user.description, user.expire, id],
      function (err, result, fields) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.status(200).json({ msg: "update sucess" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on update job" });
  }
};

{
  /**DELETE A STUDENT */
}
const deleteJob = async (req, res) => {
  const id = req.params.id;
  try {
    con.query(
      "DELETE FROM `job` WHERE `job_id`=?",
      [id],
      function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({ msg: "delete done" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on deleting job" });
  }
};

module.exports = {
  getJobs,
  getOneJobByName,
  getOneJobById,
  postJob,
  putJob,
  deleteJob,
};
