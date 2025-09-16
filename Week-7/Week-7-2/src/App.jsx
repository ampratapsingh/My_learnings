import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom } from "./store/atoms/count";
import { useRecoilState } from "recoil";
import { RecoilRoot } from "recoil";
import { useMemo } from "react";


function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return (
    <div>
      <b>Count: {count}</b>
      <EvenCountRenderer />
    </div>
  );
}

function EvenCountRenderer() {
  const isEven = useRecoilValue(evenSelector);
  return isEven ? <h4>Count is even</h4> : <h4>Count is odd</h4>;
}

function Buttons() {
  // const [count, setCount] = useRecoilState(countAtom);
  // //Since we re getting the value of count here it will rerender everytime the value of count changes
  const setCount = useSetRecoilState(countAtom);
  console.log("rendering buttons");
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      <button onClick={() => setCount((count) => count - 1)}>Decrement</button>
    </div>
  );
}

export default App;
