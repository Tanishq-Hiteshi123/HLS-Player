import { lazy, Suspense } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Spinner from './Components/Spinner'
import Login from './Pages/Login'
import PrivateRouter from './Components/PrivateRouter'
import VideoHLS from './Pages/VideoHLS'
import AudioHLS from './Pages/AudioHLS'
import AudioMP3 from './Pages/AudioMP3'
import VideoMP4 from './Pages/VideoMP4'

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
        <Route path='/audio/mp3' element = {<AudioMP3 />} />
        <Route path='/video/mp4' element = {<VideoMP4 />} />
        </Route>
        <Route path='/login' element = {<Login />} />
      </Routes>
      </Suspense>
     </Router>
    </>
    
  )
}

export default App
