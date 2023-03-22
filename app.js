const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectD } = require("./configuration/connectDb");
var cors = require('cors');
const userRoute = require("./routes/userRoute");
const companyRoute = require("./routes/companyRoute");
const jobRoute = require("./routes/jobRoute");
const profileRoute = require("./routes/profileRoute");
const skillRoute = require("./routes/skillRoute");
const wkRoute = require("./routes/wkRoute");
dotenv.config();
const port = process.env.PORT;
app.use(cors())

app.listen(port, (er) => {
  if (er) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
app.use(express.json());
connectD();
app.use("/", userRoute, companyRoute, jobRoute, profileRoute, skillRoute, wkRoute)
