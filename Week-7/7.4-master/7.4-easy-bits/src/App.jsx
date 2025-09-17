
import './App.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom, totalNotificationSelector } from './atoms'
import { useMemo } from 'react'
//RecoilRoot

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom)
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const notificationsAtomCount = useRecoilValue(notificationsAtom)
  const messagingAtomCount = useRecoilValue(messagingAtom)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  // const totalNotificationCount = useMemo(() => {
  //   return networkNotificationCount + jobsAtomCount + notificationsAtomCount + messagingAtomCount;
  // }, [networkNotificationCount, jobsAtomCount, notificationsAtomCount, messagingAtomCount]) 

  return (
    <>
      <button>Home</button>
      
      <button>My network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
      <button>Jobs {jobsAtomCount}</button>
      <button>Messaging ({messagingAtomCount})</button>
      <button>Notifications ({notificationsAtomCount})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App



// Why Selector > useMemo here

// Scope of memoization
// useMemo is scoped to a single component.
// Selector memoization is global — shared across all components that use it.

// Avoids repetition
// With useMemo, if 5 components need totalNotifications, each has to repeat the same logic.
// With a selector, the logic lives in one place.

// Automatic dependency tracking
// In useMemo, you must manually list dependencies.
// In a selector, get() automatically tracks which atoms/selectors were read.

// Consistency
// Selector ensures all components see the same computed state.
// With useMemo, each component might compute slightly differently if logic diverges.

// ✅ Summary

// useMemo = good for optimizing calculations inside a single component.

// Recoil selectors = best when you want a shared, derived state across multiple components.