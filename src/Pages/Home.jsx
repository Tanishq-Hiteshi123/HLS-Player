import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-full bg-gradient-to-r from-indigo-500 '>
   <div className='h-[70vh] flex items-center gap-5 justify-center  '>
   <div className='w-[20vw] flex flex-col items-start gap-5'>
        <div>
        <h1 className='text-6xl font-bold text-purple-800'>Video</h1>
        <h1 className='text-6xl font-bold text-purple-800'>Streaming</h1>
        </div>
        <p className='text-gray-200 text-sm mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus, veritatis, voluptatem culpa accusantium eveniet, obcaecati</p>
        <button className='bg-purple-700 py-2 px-5 text-white rounded-full' onClick={() => navigate("/main")}>  Get Started </button>
     </div>
     <div className='w-[40vw] h-[60%]'>
        <img src="https://plus.unsplash.com/premium_photo-1720796408865-77661f4f23c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='h-[30rem] rounded-md' />
     </div>
   </div>
    </div>
  )
}

export default Home
