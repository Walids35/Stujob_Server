const { con } = require("../configuration/connectDb");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

{
  /** GET ALL THE STUDENTS */
}
const getUsers = async (request, response) => {
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.status(200).json({ student: result });
      });
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting student" });
  }
};

{
  /** GET A STUDENT BY NAME */
}
const getOneUserByName = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "SELECT * FROM student WHERE `fullname`=? ",
        [user.name],
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ student: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting student" });
  }
};

{/** GET A STUDENT BY ID */}
const getOneUserById = async (request, response) => {
  const id = request.params.id;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT * FROM student WHERE student_id= ${id}`,
        function (err, result) {
          if (err) throw err;
          console.log(result);
          response.status(200).json({ student: result });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on getting student" });
  }
};

{/** ADD A STUDENT*/}
const postUser = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO student SET ?",
        user,
        function (err, result, fields) {
          if (err) throw err;
          response
            .status(200)
            .json({ student: result, msg: " SUCCESS student Added" });
        }
      );
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding student" });
  }
};

{/**UPDATE A STUDENT */}
const putUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    con.query(
      "UPDATE `student` SET `fullname`=?,`email`=? where `student_id`=?",
      [user.fullname, user.email, id],
      function (err, result, fields) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.status(200).json({ msg: "update sucess" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on update student" });
  }
};

{/**DELETE A STUDENT */}
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    con.query(
      "DELETE FROM `student` WHERE `student_id`=?",
      [id],
      function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({ msg: "delete done" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "error on deleting student" });
  }
};

{/** REGISTER */}
const register = async (request, response) => {
  const user = request.body;
  try {
    con.connect(function (err) {
      if (err) throw err;
      const query = con.query("SELECT * FROM student WHERE email = ?",[user.email],
        function (err, result, fields) {
          if (err) throw err;
        }
      );
      if (query) {
        response.status(400).json({ msg: "user already exist you sould login" });
      } else {
        con.query("INSERT INTO student SET ?",user,
        function (err, result, fields) {
          if (err) throw err;
        }
      );
      }
    });
  } catch (error) {
    response.status(500).json({ msg: "error on adding employee" });
  }
};
 
{/**LOGIN */}
const login = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      if (user.password === foundUser.password) {
        const token = jwt.sign({ id: foundUser._id }, "SecretToken");
        res.status(200).json({ user: foundUser, token: token });
      } else {
        res.status(400).json({ msg: "wrong password" });
      }
    } else {
      return res.status(400).json({ msg: "you must register before" });
    }
  } catch (error) {
    console.log(error);
  }
};
  

module.exports = {
  getUsers,
  getOneUserByName,
  getOneUserById,
  postUser,
  putUser,
  deleteUser,
  register,
  login
};
