import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import useIsOnline from "./useIsOnline";
import useMousePointer from "./useMousePointer";

//should start with use
function useTodos({ n }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const value = setInterval(() => {
      axios
        .get("https://dummyjson.com/todos")
        .then((response) => {
          setTodos(response.data.todos); // works now because it's an array
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, n);

    axios.get("https://dummyjson.com/todos").then((response) => {
      setTodos(response.data.todos); // works now because it's an array
      setLoading(false);
    });

    return () => clearInterval(value);
  }, [n]);

  return { todos, loading };
}

function App2() {
  const { x, y } = useMousePointer();
  let n = 5000;
  const { todos, loading } = useTodos(n);
  const isOnline = useIsOnline();

  // if (isOnline) {
  //   return <h1>Online bro</h1>;
  // }

  // if (!isOnline) {
  //   return <h1>Offline bro</h1>;
  // }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {todos.map((todo) => {
        return <Track todo={todo} />;
      })}
      <p>Your position is:{x}</p>
      <p>Your position is:{y}</p>
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      <p>{todo.todo}</p>
      <p>{todo.completed}</p>
    </div>
  );
}

export default App2;


//we can do the same using SWR library 