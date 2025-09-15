import React, { useState, createContext, useContext } from "react";

// 1. Create the Context
export const CountContext = createContext();

export const App2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* 2. Provide both count and setCount */}
      <CountContext.Provider value={{ count, setCount }}>
        <Count />
        <CountRenderer />
      </CountContext.Provider>
    </div>
  );
};

// 3. Count component (uses context instead of props)
function Count() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      {count}
      <Buttons />
    </div>
  );
}

// 4. Separate renderer (only cares about count)
function CountRenderer() {
  const { count } = useContext(CountContext);
  return <div>Rendered count: {count}</div>;
}

// 5. Buttons (update count from context)
function Buttons() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}


// What if we place the Button component inside the Count component?
// We would need to pass the setCount to the Count component even though it doesn't need it.
//It is called prop drilling
//It has nothing to do with re-rendering

// 🔹 Context API Solution
// Context lets you create a global-like store so any component can access data without passing it manually through props.

// 🔹 How It Works
// Create Context → createContext(defaultValue).
// Provide a value → Wrap part of your component tree with <Context.Provider value={...}>.
// Consume the value → Any nested component can use useContext(Context) to directly access it.

// Without context → you drill props down manually.
// With context → you “broadcast” a value to all children in the tree.
