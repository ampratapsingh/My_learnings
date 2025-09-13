// 🔹 What are Custom Hooks?

// A custom hook is just a JavaScript function whose name starts with use and that uses other hooks inside (useState, useEffect, etc.).
// Purpose: Reuse stateful logic across components.
// They don’t add new features to React — they just let you extract and share logic.
// 👉 Think of them as “logic components without UI”.
//Hooks like useState, useEffect can be used only inside Components and custom Hooks. They cant be used in any random ass function starting with a lower case letter

import { useState } from "react";

// our custom hook
function useTodos(initialTodos = []) {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}

export default useTodos;

//-----------------------------------------------------------------------------------------

//Now we can use this useTodo hook in any component like in the below example

import React, { useState } from "react";
import useTodos from "./useTodos";

function TodoApp() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos([]); 
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <h2>My Todos</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a todo"
      />
      <button
        onClick={() => {
          addTodo(newTodo);
          setNewTodo("");
        }}
      >
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
