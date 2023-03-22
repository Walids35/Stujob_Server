const { con } = require("../configuration/connectDb");

{
  /** GET ALL THE COMPANIES */
}
const getCompanies = async (request, response) => {
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM company", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.status(200).json({ company: result });
      });
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting company" });
  }
};

{
  /** GET COMPANY BY NAME */
}
const getOneCompanyByName = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "SELECT * FROM company WHERE `company_name`=? ",
        [user.company_id],
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ student: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting company" });
  }
};

{
  /** GET A COMPANY BY ID */
}
const getOneCompanyById = async (request, response) => {
  const id = request.params.id;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT * FROM company WHERE company_id= ${id}`,
        function (err, result) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ company: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting company" });
  }
};

{
  /** ADD A COMPANY*/
}
const postCompany = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO company SET ?",
        user,
        function (err, result, fields) {
          if (err) throw err;
          response
            .status(200)
            .json({ student: result, msg: " SUCCESS company Added" });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding company" });
  }
};

{
  /**UPDATE A COMPANY */
}
const putCompany = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    con.query(
      "UPDATE `student` SET `description`=?, where `company_id`=?",
      [user.description, id],
      function (err, result, fields) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.status(200).json({ msg: "update sucess" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on update company" });
  }
};

{
  /**DELETE A STUDENT */
}
const deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    con.query(
      "DELETE FROM `company` WHERE `company_id`=?",
      [id],
      function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({ msg: "delete done" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on deleting company" });
  }
};

module.exports = {
  getCompanies,
  getOneCompanyByName,
  getOneCompanyById,
  postCompany,
  putCompany,
  deleteCompany,
};
