import {useState, useCallback, useMemo, use} from "react";

function Parent(){
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  //useMemo 
  const squares = useMemo(() => {
    console.log("Calculating squares");
    return num*num;
  },[num]);

  //useCallback
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Squares: {squares}</h1>
      <button onClick={() => setNum(num + 1)}>Change num</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

// Memoization of Functions:
// Unlike useMemo which caches the result of a function, useCallback caches the function definition itself. This means that as long as its dependencies remain unchanged, React will reuse the same function instance across multiple renders of a component.

// Preventing Unnecessary Re-renders:
// Referential Equality: In JavaScript, functions are objects, and comparing two functions with === (strict equality) will return false even if their code is identical, unless they are the exact same instance in memory. useCallback ensures that a function maintains the same reference as long as its dependencies don't change.

// Passing Functions as Props: When you pass a function down to a child component as a prop, if that function is re-created on every parent component re-render, the child component will also re-render unnecessarily, even if its own props haven't logically changed. useCallback prevents this by providing a stable function reference.

// useEffect Dependencies: If a function is used within a useEffect hook's dependency array, and that function is re-created on every render, it can lead to useEffect running more often than intended, potentially causing performance issues or infinite loops. useCallback helps stabilize these function references.

//Or in short sometimes a function rerenders and that could be due to any reason so what we do is we use useCallback to memoize the function.