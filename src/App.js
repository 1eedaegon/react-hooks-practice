import { useEffect, useRef, useState } from "react"

const useFullScreen = (callback) => {
  const element = useRef();
  const triggerFull = () => {
    element.current.requestFullscreen();
    callback(true)
  }
  const exitFull = () => {
    document.exitFullscreen()
    callback(false)
  }
  return { element, triggerFull, exitFull }
}

const App = () => {
  // States and Hooks
  const { element, triggerFull, exitFull } = useFullScreen()
  // UI Components
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>hi</h1>
      <img
        ref={element}
        src="https://wallpaperaccess.com/full/92750.jpg" width="400px">
      </img>
      <button onClick={triggerFull}>Make full screen</button>
    </div >
  )
}

export default App