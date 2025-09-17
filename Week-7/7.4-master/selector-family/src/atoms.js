import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
      return res.data.todo;
    },
  })
});

/* 
export const todosAtomFamily = atomFamily({
key: 'todosAF',
default: selectorsFamily({
  key: "todoSelectorFamily",
  get : (id) => async({get}) => {
    const rs = await axio.get("")}
    return res.data.todo
})
})
*/

//get ek function me id leta hai for each todo and then for each todo gets the response from the server



//Till now we were fetching the todos from a static todos file and creating an atom for each todo but now since we are fetching from the server we cant use async await in the atom family but we can use it with a selector family and then create an atom for each todo

// Why this version is useful
// You no longer hardcode todos in a local array — the data comes from the backend.
// Each atom fetches only the todo it cares about, instead of downloading all todos at once.
// Caching: once the atom is loaded, any other component that reads the same atom won’t re-fetch — it reuses the cached Recoil state.

// 🔹 First, what is a selector?
// A selector in Recoil is like a “derived state”:
// It doesn’t store data itself.
// It computes its value based on atoms or other selectors.
// Think of it like a function that always stays in sync with the atoms it depends on.

// 🔹 What is a selectorFamily?
// A selectorFamily is just a parameterized selector.
// It’s a factory that makes selectors that depend on an input (like an id).

// 🔹 Common use cases

// Fetching data per id (like your todos example).
// todosAtomFamily(id) → loads todo for that id from API
// Filtering subsets of data