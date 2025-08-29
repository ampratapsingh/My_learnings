const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

var users = [{
  name : "Akki",
  kidneys : [{
    healthy : false
  }]
}]

app.get('/', function(req, res){
  const akkiKidneys = users[0].kidneys;
  const numberOfKidneys = akkiKidneys.length;
  let numberofHealthyKidneys = 0;

  for(let i = 0; i < akkiKidneys.length; i++){
    if(akkiKidneys[i].healthy === true){
      numberofHealthyKidneys++;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberofHealthyKidneys;
  
  res.json({
    numberOfKidneys,
    numberofHealthyKidneys,
    numberOfUnhealthyKidneys
  })
})


app.post("/", function(req, res){
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy : isHealthy
  })
  res.json({
    mssg : "Done bro"
  })
})

app.put("/", function(req, res){
  for(let i = 0; i < users[0].kidneys.length; i++){
    users[0].kidneys[i].healthy = req.body.isHealthy;
  }
  res.json({})
})

console.log(users[0].kidneys)

app.listen(3000);