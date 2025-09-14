import { useEffect } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
  const inputRef = useRef(null);

    useEffect(() => {
      // document.getElementById("input").focus();
      inputRef.current.focus();
    }, []);

    const handleButtonClick = () => {
      //whenever we click the button our cursor should move into the input field
      // document.getElementById("input").focus();
      inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};