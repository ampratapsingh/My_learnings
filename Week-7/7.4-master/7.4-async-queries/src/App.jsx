
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { notifications, totalNotificationSelector } from './atoms'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  useEffect(() => {
    // fetch
    axios.get("https://sum-server.100xdevs.com/notifications")
      .then(res => {
        setNetworkCount(res.data)
      })
  }, [])

  return (
    <>
      <button>Home</button>
      
      <button>My network ({networkCount.networks >= 100 ? "99+" : networkCount.networks})</button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App







// How useRecoilState works
// const [networkCount, setNetworkCount] = useRecoilState(notifications);

// notifications is your atom, defined in another file.

// useRecoilState(notifications) gives you:
// networkCount → the current value stored in that atom.
// setNetworkCount → a setter that updates the atom’s value.

// So the atom is the single source of truth.
// The local variable (networkCount) in your component is just a snapshot of the atom’s current state.




// 🔹 Why it’s not the best approach
// Tied to a component’s lifecycle
// The API call only happens when MainApp mounts.
// If you later need the same data in another part of the app, you either:
// Repeat the API call in another useEffect, or
// Hope that MainApp is mounted.
// This makes state/data fetching less centralized.

// Mixes concerns
// MainApp is now doing UI work + data fetching logic.
// Harder to maintain in larger apps.

// Re-fetching logic
// If the user navigates away and back (unmount/remount), it may trigger the fetch again unnecessarily.
// No caching/sharing across components.