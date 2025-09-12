import { useState } from "react";

let counter = 4

function Keys(){
  const [todos, setTodos] = useState([{
    id: 1,
    title: "Go to College",
    description: "Go to College today please"
  },{
    id: 2,
    title: "Go to Gym",
    description: "Go to Gym today please"
  },{
    id: 3,
    title: "Go to Pakstan",
    description: "Go to Pakstan today please"
  }]);

  function addTodo(){
    setTodos([...todos, {
      id: counter++,
      title: Math.random(),
      description: Math.random()
    }])
  }

  return (
    <div>
      <button onClick={addTodo}>Add a todo</button>
      {todos.map((todos) => <Todo key={todos.id} title={todos.title} description={todos.description} /> )}
    </div>
  )
}

function Todo({title, description}){
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Keys


// Why did we pass the title and desc to Todo why not display it directly? 
// Silly question, so to handle dynamic data

//While rendering a list it is advisable to set a key, that is why in {todos.map((todos) => <Todo key={todos.id} title={todos.title} description={todos.description} /> )} we have set the key

