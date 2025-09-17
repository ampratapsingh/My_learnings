
## 🔹 What is `atomFamily`?

* An **atom** represents one piece of global state.
* But sometimes, you need **many similar atoms** — same structure, different keys.
* `atomFamily` is a **factory** that generates atoms dynamically, based on parameters.

👉 Think of it like a function that creates a “customized atom” for each unique ID.

---

## 🔹 Syntax

```js
import { atomFamily } from "recoil";

const todoAtomFamily = atomFamily({
  key: "todoAtom",         // base key (Recoil will add param automatically)
  default: (id) => ({      // can be a static value or a function
    id,
    text: "",
    completed: false,
  }),
});
```

Usage:

```js
const [todo, setTodo] = useRecoilState(todoAtomFamily(1)); // atom for todo with id=1
const [todo2, setTodo2] = useRecoilState(todoAtomFamily(2)); // atom for todo with id=2
```

Each call (`todoAtomFamily(1)`, `todoAtomFamily(2)`) gives you a **separate atom**.

---

## 🔹 Why do we need it?

Without `atomFamily`, you’d have to create **lots of individual atoms** manually:

```js
const todoAtom1 = atom({ key: "todoAtom1", default: {} });
const todoAtom2 = atom({ key: "todoAtom2", default: {} });
const todoAtom3 = atom({ key: "todoAtom3", default: {} });
// …and so on 😵
```

That’s messy and doesn’t scale.

👉 `atomFamily` solves this by letting you generate as many atoms as you want **on demand**.

---

## 🔹 Use Cases

1. **Lists of items (Todos, Notifications, Chats, etc.)**

   * Each item has its own atom, indexed by ID.
   * Example: `todoAtomFamily(todoId)`

2. **Dynamic forms**

   * Each input field gets its own state atom.
   * Example: `formFieldAtomFamily(fieldName)`

3. **Caching data per resource**

   * Store fetched data separately for each user/product.
   * Example: `userDataAtomFamily(userId)`

4. **Tabs or multiple views**

   * State that depends on which tab or section is active.

---

## 🔹 Example: Todo List with `atomFamily`

```js
import { atomFamily, useRecoilState, RecoilRoot } from "recoil";

const todoAtomFamily = atomFamily({
  key: "todoAtom",
  default: (id) => ({
    id,
    text: `Task ${id}`,
    completed: false,
  }),
});

function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoAtomFamily(id));

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => setTodo({ ...todo, completed: !todo.completed })}
      />
      {todo.text}
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <TodoItem id={1} />
      <TodoItem id={2} />
      <TodoItem id={3} />
    </RecoilRoot>
  );
}
```

Here:

* Each `<TodoItem />` has its **own atom instance**, based on `id`.
* They don’t overwrite each other — they’re isolated.

---

## 🔹 Key Points to Remember

* **`atomFamily` is parameterized state** → same atom structure, unique per key/ID.
* **Default can be static or a function** → often you use the parameter to set up defaults.
* Useful for **scalable, dynamic data** (lists, APIs, forms).
* Plays very well with **selectorFamily** (derived state with parameters).

---

## ✅ Quick Recap

* `atom` → one box for one piece of state.
* `atomFamily` → a factory that generates a separate box per ID/param.
* Use it when you’d otherwise have to create *lots of similar atoms by hand*.

---


