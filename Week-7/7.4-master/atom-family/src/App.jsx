import "./App.css";
import { RecoilRoot, useRecoilState } from "recoil";
import { todosAtomFamily } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  );
}

export default App;

// Your app:
// Creates a global piece of state for each todo (using atomFamily).
// Renders two todo items (id=1 and id=2).
// Each todo item reads its own state (title + description) from Recoil.
// They’re completely independent — updating Todo 1’s atom won’t affect Todo 2’s atom.

// (Think of it like useState where we have given a initial state for each todo by just paasing an id to atomFamily rather than creating a separate state for each todo)
