const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["mern-registration-frontend.vercel.app"], methods: ["POSt", "GET"], credentials: true }));
mongoose.connect(
  "mongodb+srv://vm66353:<newWord>@vikas.vfbf5tq.mongodb.net/employee?retryWrites=true&w=majority"
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("NO record existed");
    }
  });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((error) => res.json(error));
});
app.listen(3001, () => {
  console.log("server is running");
});
