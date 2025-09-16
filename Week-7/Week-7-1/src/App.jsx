import React, { Suspense } from "react";
import { lazy } from "react";
import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
const Dashboard = lazy(() => import('./components/Dashboard'));
const Landing = lazy(() => import('./components/Landing'));


function App() {
  return (
    <div>
      {/* <div>
        <button
          onClick={() => {
            // window.location.href = "/";
            //consoling this we get 'http://localhost:5173/Dashboard'
            //This way it will still do a reload of the page and also fetch the html again, so have to find a diff way
            //so we could use smthng called useNavigate which is a hook from react router dom
            // navigate("/");
            //The problem is that we cant use the useNavigate hook outside the BrowserRouter
          }}
        >
          Landing Page
        </button>

        <button
          onClick={() => {
            // window.location.href = "/Dashboard";
            navigate("/Dashboard");
          }}
        >
          Dashboard
        </button>
      </div> */}
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Landing /></Suspense>} />
          <Route path="/Dashboard" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Landing Page</button>

      <button onClick={() => navigate("/Dashboard")}>Dashboard</button>
    </div>
  );

  // We have wrapped the useNavigate hook inside BrowserRouter for it to work otherwise it will throw an error
}

export default App;














// 🔹 What React.lazy does
// Normally, when you build your React app, the bundler (Webpack/Vite) puts all components into one big JS bundle.
// That means the browser downloads everything upfront, even if the user never visits some parts of the app.
// This can make the initial load slow.
// React.lazy allows you to dynamically import a component only when it’s actually needed.
// 👉 This is called lazy loading.

// 🔹 How it works
// At first, the About component is not included in the main bundle.
// When React reaches <About />, it fetches that component’s code on demand (a separate bundle file).
// While it’s loading, Suspense shows the fallback UI (like a loading spinner).
// Once loaded, React renders <About />

// 🔹 Real-world use case
// Imagine an Admin Dashboard that only some users access:
// Without React.lazy, all users download the dashboard code upfront (wasted for most).
// With React.lazy, the dashboard code is fetched only if the user goes to /admin.

// When you use React.lazy, you need to wrap the lazy-loaded components inside a <Suspense> component. Otherwise React won’t know what to render while those components are loading.

