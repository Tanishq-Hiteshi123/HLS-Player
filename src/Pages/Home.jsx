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
       if (result === "video") {
         console.log("This is a video stream.");
         navigate("/video/hls")
       } else if (result === "audio") {
         navigate("/audio/hls")
       }
     })
     .catch((error) => {
       console.error("Error:", error);
     });

    }

    else if (url.includes(".mp3")) {
      //   Normal Audio File
      navigate("/audio/mp3")

    }
    else if (url.includes("mp4")) {
      //   Normal Video File
      navigate("/video/mp4")
    }
   
    

}

const handleFileUpload =  (e) =>{
  

    const fileDetails = e.target.files[0];
    console.log(fileDetails)
    if (fileDetails.name.includes(".mp4")) {
      
          const fileUrl = window.URL.createObjectURL(fileDetails)

         
          setFileUrl(fileUrl)
          localStorage.setItem("fileUrl" , fileUrl)
          navigate("/video/mp4")
          

    }

    else if (fileDetails.name.includes(".mp3")) {
      
        //  Normal Audio File :-
        const fileUrl = window.URL.createObjectURL(fileDetails)

        setFileUrl(fileUrl)

        localStorage.setItem(fileUrl , fileUrl)

        navigate("/audio/mp3")

    }



}
  // const handleURLSubmit = async (e) =>{
    
  //      e.preventDefault()
  //      console.log(e.target.files[0] , "This is the handle URl")
  //      let fileData = e.target.files[0];
  //     let  url =  URL.createObjectURL(e.target.files[0])

  //     let actualURL = url.slice(5 , url.length)
  //      localStorage.setItem("fileUrl" , actualURL)
  //      setFileUrl(actualURL)
  //      if (e.target.files[0]?.name?.includes(".m3u8")) {

  //     console.log(actualURL)
  //       // identifyTheType(fileData)
  //       identifyTheType2()
  //       .then((result) => {
  //         if (result === "video") {
  //           console.log("This is a video stream.");
  //           navigate("/video/hls")
  //         } else if (result === "audio") {
  //           navigate("/audio/hls")
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });

  //      }
      
       

  // }
  // const handleURLSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form behavior
  
  //   const file = e.target.files[0]; // Get the selected file
  //   if (!file) {
  //     console.error("No file selected.");
  //     return;
  //   }
  
  //   console.log(file, "This is the handle URL");
  
  //   // Generate a temporary URL for the file
  //   const url = URL.createObjectURL(file);
  
  //   console.log("Generated URL:", url);
  
  //   // Save the URL in localStorage (optional)
  //   localStorage.setItem("fileUrl", url);
  
  //   // Check if the file is an HLS playlist (.m3u8)
  //   if (file.name.includes(".m3u8")) {
  //     try {
  //       // Pass the URL to `identifyTheType`
  //       const type = await identifyTheType(url);
  
  //       console.log(`This is an HLS ${type} file.`);
  //       if (type === "video") {
  //         navigate("/video/hls");
  //       } else if (type === "audio") {
  //         navigate("/audio/hls");
  //       }
  //     } catch (error) {
  //       console.error("Error identifying the stream type:", error);
  //     }
  //   } else {
  //     console.error("The selected file is not an HLS playlist (.m3u8).");
  //   }
  // };
  
  return (
    <div className='h-full w-full bg-gradient-to-r from-indigo-500 '>
   <div className='h-[100vh]  flex items-center gap-5 justify-around  '>
  
     <div className='w-[40vw] h-[60%]'>
        <img src="https://plus.unsplash.com/premium_photo-1720796408865-77661f4f23c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='h-[30rem] rounded-md' />
     </div>

       <div className=' w-[50vw] flex items-center justify-center mb-12 flex-col gap-5 '>
              <form onSubmit={handleURLSubmit} className='w-full flex items-center justify-center flex-col gap-4'>
        
        <input className='px-4 w-[100%] py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200' type="text" name='url' onChange={handleURL} value={url} placeholder='example.mp4' />
        <button className='bg-purple-500 text-white p-2 rounded' type='submit'>Upload</button>
        </form>

        <h1>--OR--</h1>

        <FileUploadation handleFileUpload = {handleFileUpload}/>
       </div>
   </div>
      
       
    </div>
  )
}

export default Home
