import { React } from "react";
import { useState } from "react";

function App() {
  // Taking an array of objects
  const [todos, setTodos] = useState([
    {
      title: "Go to Gym",
      description: "Go to gym and do exercise",
      isDone: false,
    },
    {
      title: "Study Dsa",
      description: "Study DSA and prepare for interview",
      isDone: true,
    },
    {
      title: "Play Cricket",
      description: "Play cricket with friends",
      isDone: false,
    },
  ]);

  function addTodo(){
    // setTodos is a function hence starts with '(' inside which we are passing an array of objects since there can be more than one todoo but along with that in the array we are also passing the older todos and basically telling to append in the end
    setTodos([...todos,{
      title: "Go to bed",
      description: "Go to bed and sleep",
      isDone: false
    }])
  }

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {/* My Todo Component */}

      {/* <Todo title={todos[0].title} description={todos[0].description}></Todo>
      <Todo title={todos[1].title} description={todos[1].description}></Todo>
      <Todo title={todos[2].title} description={todos[2].description}></Todo> */}

      {/* Very classical Problem where we have to manually pass each Todo Hence map comes into the picture */}

      {todos.map(function(value){
        return <Todo title={value.title} description={value.description}></Todo>
      })}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default App;