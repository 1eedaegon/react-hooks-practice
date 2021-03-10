import { useEffect, useRef, useState } from "react"

const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('online', handleChange)
    window.addEventListener('offline', handleChange)
    return () => {
      window.removeEventListener('online', handleChange)
      window.removeEventListener('offline', handleChange)
    }
  }, []);
  return status;
}

const App = () => {
  // States and Hooks
  const handleNetworkChange = online => console.log(online ? "We just went online" : "We are offline")
  const status = useNetwork(handleNetworkChange);
  // UI Components
  return (
    <div className="App">
      <h1 >Use custom hook</h1>
      <h2>{status ? 'Online' : 'Offline'}</h2>
    </div >
  )
}

export default App