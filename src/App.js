import { useEffect, useRef, useState } from "react"

const usePreventLeave = () => {
  const listener = e => {
    e.preventDefault();
    e.returnValue = "";
  }
  const enablePrevent = () => window.addEventListener('beforeunload', listener)
  const disablePrevent = () => window.removeEventListener('beforeunload', listener)
  return { enablePrevent, disablePrevent }
}

const App = () => {
  // States and Hooks
  const { enablePrevent, disablePrevent } = usePreventLeave()
  return (
    // Components
    <div className="App">
      <h1>Use custom hook</h1>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div >
  )
}

export default App