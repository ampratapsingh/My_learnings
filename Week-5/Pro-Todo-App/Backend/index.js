const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const {todo} = require("./db");
const cors = require("cors");


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

app.post("/todo", async(req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if(!parsedPayload.success){
    return res.status(411).json({
      msg: "Invalid payload"
    });
  }

  //Putting the data in mongoDB
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  })

  res.json({
    msg: "Todo created successfully"
  })
})

app.get("/todos", async(req, res) => {
  const todos = await todo.find({});
  res.json({
    todos
  })
})

app.put("/completed", async(req, res) => {
  const todoId = req.body;
  const parseId = updateTodo.safeParse(todoId);
  if(!parseId.success){
    return res.status(411).json({
      msg: "Invalid request"
    });
  }

  await todo.updateOne({
    //since in mogoDB we have _id instead of id
    _id: todoId.id
  },{
    $set: {
      completed: true
    }
  });

  res.json({
    msg: "Todo updated successfully"
  })

})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
