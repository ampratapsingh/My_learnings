const express = require('express');
const app = express();
const z = require('zod');

app.use(express.json());

const kidneyInput = z.literal("1").or(z.literal("2"));

app.post("/health-checkup", (req, res) => {
  const kidneyID = req.body.kidneyID;
  const validation = kidneyInput.safeParse(kidneyID);
  if(!validation.success) {
    res.status(400).json({
      message: "Invalid kidney ID"
    })
  }
  //some logic
  res.send('Your heart is healthy');
})

app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong');
})

app.listen(3000);
