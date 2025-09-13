import {useMemo, useState} from "react";

function ExpensiveCalculation({num}){
  const [count, setCount] = useState(0);

  //memoize result of heavy calculation
  const factorial = useMemo(() => {
    console.log("Calculating factorial");
    function computeFactorial(n){
      if(n <= 1) return 1; 
      return n * computeFactorial(n - 1);
    }
    return computeFactorial(num);
  }, [num]);

  return (
    <div>
      <h1>Factorial of {num} is {factorial}</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

export default ExpensiveCalculation

// 🔹 useMemo

// Purpose: Memoize (cache) the result of a computation to avoid recalculating it on every render.

// Returns: A memoized value.

// When it runs: During render, only recomputes if dependencies change.



//What if we did this factorial inside the useEffect hook?
// useEffect(() => {
//   console.log("Calculating factorial");
//   function computeFactorial(n){
//     if(n <= 1) return 1;
//     return n * computeFactorial(n - 1);
//   }
//   console.log(computeFactorial(num));
// }, [num]);

// ✅ This works, but notice:
// The component renders first with stale data (old factorial value).
// Then React runs the effect, updates state, and triggers a second render.
// That’s an extra render cycle.


//But with useMemo:
// The factorial is computed synchronously during render.
// No extra state, no second render.
// The value is cached until num changes.

//For example if we change the value of num from 5 to 6:🔹 What happens when num = 5 → 6?
// Render with old state:
// UI still shows factorial of 5 until effect runs.
// After render, React runs useEffect:
// Computes factorial(6) = 720.
// Calls setFactorial(720).
// setFactorial → triggers second render:
// UI now updates to factorial of 6.
// 👉 Two renders per change:
// First render shows old value.
// Second render updates to the new value.


//But with useMemo:
// 🔹 What happens when num = 5 → 6?
// During render, React sees num = 6.
// useMemo recalculates factorial(6) immediately.
// UI directly shows factorial of 6 (720).
// 👉 Only one render per change:
// No stale value, no extra render cycle.