import { useCallback, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    const handleIncrement = useCallback(() =>
        setCount(function(count) {
            return count + 1
        })
    );

    const  handleDecrement = useCallback(() =>
        setCount(count => count - 1)
    );
    
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

const CounterButtons = ({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
);

//On clicking increment/decrement button, only Assignment1 should be re-rendered but CounterButtons component is also getting re-rendered which doesnt even contain the state variables. Hence they can be memoized 

// const CounterButtons = memo({ onIncrement, onDecrement }) => (
//     <div>
//         <button onClick={onIncrement}>Increment</button>
//         <button onClick={onDecrement}>Decrement</button>
//     </div>
// );

// 🔹 React.memo (HOC)
// What it is: A higher-order component (not a hook).
// What it does: Prevents a component from re-rendering if its props haven’t changed.
// When to use: Wrapping a component that is pure (renders the same output for the same props).
//so to ensure that the props are unchanged we'll wrap the functions with useCallback


// const handleIncrement = useCallback(() => {
//         setCount(count + 1)
// },[count]);

// If we know that we're using a state state variable inside, we need to pass it as a dependency.otherwise the increment will only do +1 and decrement -1.
// but that defeats the whole purpose since it will rerender again and again. hence what we do is use:
// setCount(function(count) {
//     return count + 1
// }) 
// what it does is that it reads the current value of count and then updates it without having to pass it explicitly as a dependency

