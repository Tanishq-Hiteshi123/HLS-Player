import { lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

   const HomeComponents = lazy(() => import("./Pages/Home"))
  return (
    <>
     <Router>
      <Suspense fallback = {<>Loading...</>}>

      <Routes >
        <Route path='/'  element = {<HomeComponents />}/>
      </Routes>
      </Suspense>
     </Router>
    </>
    
  )
}

export default App
