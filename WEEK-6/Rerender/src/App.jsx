// import { useState } from "react";

//  const App = () => {
//   const [num, setNum] = useState(0);
//   function ranMNum() {
//     setNum(Math.random());
//   }
//   return (
//     <div>
//       <button onClick={ranMNum}>Click to change the title</button>
//       <p>My name is {num}</p>
//       <p>My name is Ali</p>
//     </div>
//   );
// };

// export default App;

// Better Way---------------------------------------------------------

import { useState } from "react";

function App() {
  return (
    <div>
      <HeaderWithButton />
      <Header title="Prince"></Header>
      <Header title="Rajput"></Header>
    </div>
  );
}

function HeaderWithButton() {
  const [title, setTitle] = useState("Ali");
  function ranMNum() {
    setTitle("My name is" + Math.random());
  }
  return (
    <>
      <button onClick={ranMNum}>Click to change the title</button>
      {/* <h1>My name is {title}</h1> or */}
      <Header title={title}></Header>
    </>
  );
}

function Header({ title }) {
  return <h1>{title}</h1>;
}

export default App;

// You can see how the second approach some of our problems by defining a different component which rerenders so that other components are not rerendered. It can also be said that we are passing down the state
//There is also a third approach where instead of creating a new component and passing down the state we can use React.memo on the component that rerenders all its children when data changes. In this case it is the Header component. Here's how we can use it.

// const Header = React.memo(function Header({ title }) {
//   return <div>{title}</div>;
// });
