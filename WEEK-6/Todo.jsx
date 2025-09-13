import { useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos").then(async function (res){
      const data = await res.json;
      setTodos(data);
    });
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

export const Todo = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

//Now what is useEffect?
// It could mimic lifecycle methods, now what is lifecycle methods?
// -basically:
// 1. Mounting Phase (when the component is being created and inserted into the DOM)
// 2. Updating Phase (when the component is being updated and re-rendered)
// 3. Unmounting Phase (when the component is being removed from the DOM)
// But these lifecycle methods were used back in the days of class based components.

// In this era hooks are introduced which let you use state and lifecycle features inside functional components (without needing class components).

// useState → allows state management in functional components.
// useEffect → mimics lifecycle methods (runs code after render, updates, or cleanup).

// Earlier in our todos app we used fetch to get data from an API. but the problem with that was it used to fetch continuously and we were making too many requests to the API. To solve this we used useEffect above where the [] is an empty array. This means that the effect will only run once, when the component is first rendered. we could also pass state in the array to run the effect when the state changes.

//To send the rquest every 10 seconds we can do this:
// useEffect(() => {
//   const interval = setInterval(() => {
//     fetch("https://jsonplaceholder.typicode.com/todos").then(async function (res){
//       const data = await res.json;
//       setTodos(data);
//     });
//   }, 10000);
// }, []);


//useEffect cant take an async function mind it

//In the fetch it gets data then setTodos, that means the state changes and hence the parent that is app re-renders.we get stuck in an infinite loop of rendering. To fix this we can use useEffect to run the request only when the component is first rendered.