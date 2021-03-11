import { useEffect, useRef, useState } from "react"
import useAxios from "./useAxios"



const App = () => {
  // States and Hooks
  const { loading, error, data, refetch } = useAxios({ url: "https://yts.mx/api/v2/list_movies.json" })
  console.log(loading, error, data)
  // UI Components
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>{data && data.status}</h1>
      <h2>{loading ? "Now loading..." : "Loaded!"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div >
  )
}

export default App