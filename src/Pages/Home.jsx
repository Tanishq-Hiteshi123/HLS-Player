import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/userContext'
import { useContext, useState } from 'react'
import { identifyTheType } from '../utils'
import FileUploadation from '../Components/FileUploadation'

function Home() {
  const navigate = useNavigate()

  const {setFileUrl} = useContext (UserContext)
  

  const [url , setUrl] = useState("")

  const handleURL = (e) =>{
    setUrl(e.target.value)
  }

  const handleURLSubmit = async (e) =>{
    
       e.preventDefault()
       console.log(url)
       localStorage.setItem("fileUrl" , url)
       setFileUrl(url)
       if (url.includes(".m3u8")) {


        identifyTheType(url)
        .then((result) => {
          if (result === 100000) {
            console.log("This is a video stream.");
            navigate("/video/hls")
          } else if (result === 90000) {
            navigate("/audio/hls")
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

       }
      
       

  }
  return (
    <div className='h-full w-full bg-gradient-to-r from-indigo-500 '>
   <div className='h-[100vh] flex items-center gap-5 justify-center  '>
   <div className='w-[20vw] flex flex-col items-start gap-5'>
        <div>
        <h1 className='text-6xl font-bold text-purple-800'>Video</h1>
        <h1 className='text-6xl font-bold text-purple-800'>Streaming</h1>
        </div>
        <p className='text-gray-200 text-sm mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus, veritatis, voluptatem culpa accusantium eveniet, obcaecati</p>
        
     </div>
     <div className='w-[40vw] h-[60%]'>
        <img src="https://plus.unsplash.com/premium_photo-1720796408865-77661f4f23c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='h-[30rem] rounded-md' />
     </div>

   </div>
       <form onSubmit={handleURLSubmit} className='w-full flex items-center justify-center flex-col gap-4'>
 
         <input className='px-4 w-[50%] py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200' type="text" name='url' onChange={handleURL} value={url} />
         <button className='bg-purple-500 text-white p-2 rounded' type='submit'>Upload</button>
       </form>
       {/* <FileUploadation /> */}
    </div>
  )
}

export default Home
