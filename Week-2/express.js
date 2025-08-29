const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body.message);
  res.send("Hello World!");
});

app.listen(port);
