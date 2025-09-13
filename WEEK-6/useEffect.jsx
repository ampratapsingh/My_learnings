import { useState, useEffect } from "react";
function App(){
  const [id, setId] = useState(1);
  return (
    <div>
      {/* Now what if we've 5 buttons and we want to send the id of the button to the todo component */}
      <button onClick={() => setId(1)}>1</button>
      <button onClick={() => setId(2)}>2</button>
      <button onClick={() => setId(3)}>3</button>
      <button onClick={() => setId(45)}>45</button>
      <Todo id={id}/>
    </div>
  )
}

function Todo({id}){
  const [todo, setTodo] = useState([]);

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(async function(res){
      const data = await res.json();
      setTodo(data);
    })
  },[id]);

  return(
    <div>
      <h1>{todo.title}</h1>
      <h5>{todo.description}</h5>
    </div>
  )
}

// 🔹 useEffect

// Purpose: Run side effects after render (things React doesn’t do by itself, like API calls, DOM manipulation, subscriptions, timers).

// Returns: Nothing (except an optional cleanup function).

// When it runs: After React has updated the DOM.

