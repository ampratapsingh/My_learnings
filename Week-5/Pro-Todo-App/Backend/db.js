const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://x:mongopass@cluster0.fhaawld.mongodb.net/todos")

const todoschema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
})

const todo = mongoose.model("todos", todoschema);

module.exports = {
  todo
}