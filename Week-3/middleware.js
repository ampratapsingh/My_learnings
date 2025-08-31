const express = require('express');
const app = express();

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if(username != "amit" && password != "1234") {
    res.status(403).json({
      message: "Unauthorized"
    })
  }
  else{
    next();
  }
}

app.get("/health-checkup", userMiddleware, (req, res) => {
  //some logic
  res.send('Your heart is healthy');
})

app.get("/kidney-check", userMiddleware, (req, res) => {
  //some logic
  res.send('Your kidneys are healthy');
})

app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong');
})

app.listen(3000);