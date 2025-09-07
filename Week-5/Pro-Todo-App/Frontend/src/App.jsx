import { useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]) //state aa gya so basically backend se data manga rhe in form of array

  fetch("http://localhost:3000/todos")
    .then(async function(res){
      const json = await res.json();
      setTodos(json.todos);
    })
 


  return (
   <div>
    <CreateTodo />
    <Todos todos={todos}/>
   </div>
  )
}

export default App
