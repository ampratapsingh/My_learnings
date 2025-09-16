// ✅ Key points about atoms:
//It expects a single object with the following properties:
// key: must be unique (think of it like an ID).
// default: initial state value.
// Any component using the atom will automatically update when the atom changes.


import { atom } from "recoil";

export const countAtom = atom({
  key: "countAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value
})

export const evenSelector = selector({
  key: "evenSelector",
  get : (props) => {
    const count = props.get(countAtom);
    return count % 2 === 0
  }
})




// 🔹 What is a Selector?
// A selector is like a “computed value” in Recoil.
// It lets you derive new state from existing atoms (or even other selectors).
// Think of it like useMemo but at the global Recoil state level.

// 🔹 Why use Selectors?
// Keep your atoms simple (just raw state).
// Put logic (calculations, transformations, filtering) into selectors.
// Any component using that selector will automatically update when the underlying atom changes.




// ### 🔹 What we had so far
// 1. **Atoms** → hold *raw state*.

//    ```js
//    const countAtom = atom({
//      key: "countAtom",
//      default: 0,
//    });
//    ```

//    Any component can read or update this.

// 2. **Hooks** → `useRecoilValue`, `useRecoilState`, etc.

//    * You can show or change the atom’s value directly.

// So far so good. But then…

// -------------------------------------------------------

// ### 🔹 The problem (why selectors exist)
// Imagine you want to display **`count * 2`** in multiple places.
// Without selectors, you’d do something like this inside every component:

// ```jsx
// const count = useRecoilValue(countAtom);
// const double = count * 2;  // do this everywhere
// ```

// That means:

// * You repeat the same calculation in every component.
// * If the formula changes (say `count * 3 + 1`), you need to update it in **all places**.
// * It makes your code harder to maintain and less DRY (Don’t Repeat Yourself).

// ---

// ### 🔹 Selector = “computed value”

// Selectors solve this by letting you define the formula **once** in a central place.

// ```js
// const doubleCountSelector = selector({
//   key: "doubleCountSelector",
//   get: ({ get }) => {
//     const count = get(countAtom);
//     return count * 2;  // central formula
//   },
// });
// ```

// Now, any component can use:

// ```jsx
// const doubleCount = useRecoilValue(doubleCountSelector);
// ```

// ✅ No repeated logic.
// ✅ If the formula changes, update it only once.
// ✅ Automatically updates everywhere when `countAtom` changes.

// ---

// ### 🔹 Beginner-friendly analogy
// Think of **atoms** as the “ingredients” in your kitchen (raw rice, vegetables, spices).
// * They are the source of truth.
// Think of **selectors** as the “recipe” you make from those ingredients (fried rice, curry).
// * A recipe can change how you use the same ingredients.
// * If you change one ingredient (atom), the dish (selector) automatically changes too.

// -----------------

// ### 🔹 Why selectors are useful

// * Keep **business logic** (like calculations, filtering, mapping) separate from UI code.
// * Reduce repetition.
// * Make apps easier to maintain as they grow.
// * Can even fetch **async data** (like recipes that call the store for more ingredients 😅).

// ---

// 👉 So in short:
// We already had atoms for raw state, but without selectors, every component would keep **repeating the same derived logic**. Selectors give us a single source of truth for **computed values**, just like atoms are the single source of truth for **raw values**.


