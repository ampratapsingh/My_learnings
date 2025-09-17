import { atomFamily } from "recoil";
import { TODOS } from "./todos";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: id => {
    return TODOS.find(x => x.id === id)
  },
});


//We are creating an atom based on the id of the todo.The code which is doing this step is:
// default: id => {
//     return TODOS.find(x => x.id === id)
//  }
//and the data in its state/atom comes from todos.js
