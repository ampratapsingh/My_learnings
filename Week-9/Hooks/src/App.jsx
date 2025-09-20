import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [render, setRender] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setRender((render) => !render);
    }, 5000);
  }, []);

  return <>{render && <MyComponent />}</>;
}

export default App;

function MyComponent() {
  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("component unmounted");
    };
  }, []);
}

//[xyz] for this dependency array, the first time it renders it prints "component mounted" and the second time it changes it renders the return part
//[] for empty dependency array, the first time it mounts it renders "component mounted" and when it unmounts it renders the return part
