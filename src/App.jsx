import { lazy, Suspense } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Spinner from './Components/Spinner'
import Login from './Pages/Login'
import PrivateRouter from './Components/PrivateRouter'
import VideoHLS from './Pages/VideoHLS'
import AudioHLS from './Pages/AudioHLS'

function App() {

   const HomeComponents = lazy(() => import("./Pages/Home"))
   const MainComponents = lazy(() => import ("./Pages/Main"))
   const MainHLSComponents = lazy(() => import("./Pages/MainHLS"))
  return (
    <>
     <Router>
      <Suspense fallback = {<><Spinner /></>}>

      <Routes >
        <Route element = {<PrivateRouter></PrivateRouter>} >
        <Route path='/'  element = {<HomeComponents />}/>
        <Route path='/video/hls' element = {<VideoHLS />} />
        <Route path='/audio/hls' element = {< AudioHLS/>} />
        {/* <Route path='/videoHLS' element = {<VideoHLS />} /> */}
        </Route>
        <Route path='/login' element = {<Login />} />
      </Routes>
      </Suspense>
     </Router>
    </>
    
  )
}

export default App
