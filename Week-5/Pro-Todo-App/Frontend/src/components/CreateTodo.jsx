import { useState } from 'react'

export const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input style={{padding: 10, margin: 10}} type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} /> <br/>
      <input style={{padding: 10, margin: 10}} type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} /> <br/>
      <button style={{padding: 10, margin: 10}} type='submit' onClick={() => {
        fetch("http://localhost:3000/todo", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description
          }),
          headers:{
            "Content-Type": "application/json"
          }
        })
      }}>Create a todo</button>
    </div>
  )
}

//hum yaha se backend ke paas bhejenge aur todos fir render karega
//yhi se kyun? kyunki if u remember we used to do document.getElementById() so imagine this is that thing
//there is two way of sending the data to the backend one is: using a state variable and other is by using react-query
//state approach creates a lot of re renders
//also because of the fetch the network tab is fetching the todos continuously in app.jsx

