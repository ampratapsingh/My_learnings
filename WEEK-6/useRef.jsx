// 🔹 What is useRef?

// A React hook that returns a mutable object:
// { current: value }
// Unlike state, changing .current does NOT cause a re-render.
// The object persists across renders → it’s like a “box” that holds a value.

// 🔹 Why is it used?

// Accessing DOM elements (like document.querySelector but the React way).
// Storing values that don’t need re-renders (e.g., timers, previous values).
// Avoiding re-creation of objects/functions across renders.

//Short Examples
// Accessing a DOM element

import React, { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // directly access the DOM node
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Click button to focus" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default InputFocus;
