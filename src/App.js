import { useEffect, useState } from "react"
import { useTitle } from "./customHooks"

const App = () => {
  const titleUpdator = useTitle('Loading...')
  setTimeout(() => titleUpdator('The home'), 5000)
  return (
    <div className="App">
      <h1>Use effect hook</h1>
    </div >
  )
}

export default App