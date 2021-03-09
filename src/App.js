import { useEffect, useRef, useState } from "react"

const useBeforeLeave = onBefore => {
  const handle = (e) => {
    const { outerHeight: windowSize } = window;
    const { clientY: currSize } = e;
    console.log(currSize, windowSize, "Leaving...")
  }
  useEffect(() => {
    document.addEventListener('mouseleave', handle)
    return () => document.removeEventListener('mouseleave', handle)
  }, [])
}

const App = () => {
  // States and Hooks
  const begForLife = console.log("Please don't leave!")
  useBeforeLeave(begForLife)
  // UI Components
  return (
    <div className="App">
      <h1>Use custom hook</h1>
    </div >
  )
}

export default App