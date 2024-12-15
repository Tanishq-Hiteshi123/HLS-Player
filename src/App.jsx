import { lazy, Suspense } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Spinner from './Components/Spinner'

function App() {

   const HomeComponents = lazy(() => import("./Pages/Home"))
   const MainComponents = lazy(() => import ("./Pages/Main"))
  return (
    <>
     <Router>
      <Suspense fallback = {<><Spinner /></>}>

      <Routes >
        <Route path='/'  element = {<HomeComponents />}/>
        <Route path='/main' element = {<MainComponents />} />
      </Routes>
      </Suspense>
     </Router>
    </>
    
  )
}

export default App
