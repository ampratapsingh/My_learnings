

### 🔹 How `useEffect` works

1. The function you pass to `useEffect` runs **after render**.
2. If that function itself returns another function, React treats that returned function as a **cleanup** step.

   * Cleanup runs when the component **unmounts**, or **before the effect runs again** (on re-renders if the dependency array changes).

---

### 🔹 Example 1: With `setInterval`

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  // cleanup
  return () => clearInterval(id);
}, []); // empty deps → runs once
```

✅ What happens:

* When component mounts → `setInterval` starts.
* When component unmounts → cleanup runs (`clearInterval(id)`), stopping memory leaks.

---

### 🔹 Example 2: With event listeners

```jsx
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);

  window.addEventListener("resize", handleResize);

  // cleanup
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

✅ Why? If you don’t remove the listener, it will stay active even after the component is gone → bad for performance and bugs.

---

### 🔹 Example 3: Without cleanup

```jsx
useEffect(() => {
  console.log("Effect ran!");
}, []);
```

If you don’t `return` anything, React just runs your effect and has nothing to clean up.

---

👉 So, in short:
**The `return` inside a `useEffect` hook defines what should be cleaned up when the effect is re-run or the component is unmounted.**

---

