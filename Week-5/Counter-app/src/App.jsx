import { useState } from "react";

function App(){
  const [count, setCount] = useState(0);

  return(
    <div>
      {/* passing State -> mainly 2 things in the state*/}
      {/* Basically defined a component and passong state to it */}
      <CustomButton count={count} setCount={setCount}></CustomButton> 
    </div>
  )
}

function CustomButton(props){
  function onClickHandler(){
    props.setCount(props.count + 1);
  }
  return(
    <button onClick={onClickHandler}>Counter {props.count}</button>
  )
}

export default App

// a state is an object that stores data or information about a component which can change over time.

// When the state of a component changes, React re-renders that component to update the UI with the new data.

// Definition: State is a built-in object in React that holds dynamic data specific to a component.

// Key point: When state changes, React automatically re-renders the component to reflect the new data.

// Components = reusable UI units
// State = data that makes components dynamic and interactive