const express = require("express");
const app = express();

app.use(express.json());

app.post("/todo", (req, res) => {
  
})

app.get("/todos", (req, res) => {
  
})

app.put("/completed", (req, res) => {
  
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
