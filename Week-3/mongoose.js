const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://geralt:mongopass@cluster0.fhaawld.mongodb.net/testapp")

const User = mongoose.model("Users", {
  username: String,
  password: String,
});

const app = express();
app.use(express.json());


app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // const existingUser = User.findOne({ username: username });
  // if (existingUser) {
  //   return res.status(400).json({
  //     msg: "User already exists",
  //   });
  // }
  const user = new User({ username: username, password: password });
  user.save();

  return res.json({
    msg: "User created",
  });

  // var token = jwt.sign({ username: username }, jwtPassword);
  // return res.json({
  //   token,
  // });
});

// app.get("/users", function (req, res) {
//   const token = req.headers.authorization;
//   try {
//     const decoded = jwt.verify(token, jwtPassword);
//     const username = decoded.username;
//     return res.json(ALL_USERS.filter((user) => user.username !== username));
//   } catch (err) {
//     return res.status(403).json({
//       msg: "Invalid token",
//     });
//   }
// });

app.listen(3000);