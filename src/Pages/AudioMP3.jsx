import React, { useContext, useEffect, useRef, useState } from "react";
import HLSPlayer from "../Components/HLSPlayer";
import SongInfo from "../Components/SongInfo";
import Lyrics from "../Components/Lyrics";
import { UserContext } from "../Context/userContext";

function AudioMP3() {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { fileUrl } = useContext(UserContext);
  
  const intervalRef = useRef(null);
   const [currentSpeed , setCurrentSpeed] = useState(1)
      const [currentVolume , setCurrentVolume] = useState(0.5)


  const handleSeek = (event) => {
  
   
        audioRef.current.currentTime = event.target.value; 
   
    // console.log(audioRef.current.currentTime , "current Audio Value")
    setProgress(event.target.value); 

  };


  const handlePlayMusic = () => {
    console.log("Playing the music");
   
    console.log("Playing the audio " , audioRef)
      audioRef.current.play()
   
    setIsPlaying(!isPlaying);
    intervalRef.current = setInterval(handleTimeUpdate , 1000)
  };
  const handlePauseMusic = () => {
    console.log("Paused The Music");
    console.log(audioRef.current)
  
    audioRef.current.pause()
 
    setIsPlaying(!isPlaying);
    clearInterval(intervalRef.current)
  };

  const handleTimeUpdate = (e) =>{
    // console.log(progress)
    // console.log(audioRef.current.currentTime , audioRef.current.duration)
   
        setDuration(audioRef.current.duration)
        setProgress(audioRef.current.currentTime)
  

        if (Math.floor(audioRef.current.currentTime) == Math.floor(audioRef.current.duration)) {
            setIsPlaying(false);
            setProgress(0)
            clearInterval(intervalRef.current)
      }
    

  }

  const handleFastForward = () =>{
    
    //   console.log("handling fast forwarding")
    //   console.log(audioRef.current.currentTime , progress)
      const updatedProgress = progress + 10;

    
      setProgress(updatedProgress)
  
        audioRef.current.currentTime = updatedProgress;
   

  }
  const handleFastBackward = () => {
       console.log("Handling the fast Backward")
       const updatedProgress = progress - 10;
       if (updatedProgress < 0) {
         setProgress(0);
       
            audioRef.current.currentTime = 0;
        
       }
       else {
           setProgress(updatedProgress);
          
            audioRef.current.currentTime = updatedProgress;
        
         
       }

  }


   const handleDownLoadFile = () =>{
      
        console.log("Handling the download file")
  
  
    }
  
    const handleSpeedChange = (e) =>{
       setCurrentSpeed(Number(e.target.value))
    }
    const handleVolumeChange = (e) =>{
       setCurrentVolume(Number(e.target.value))
    }
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.playbackRate = currentSpeed;
      }
    }, [currentSpeed]);
  
        useEffect(() => {
          if (audioRef.current) {
            audioRef.current.volume = currentVolume;
          }
        }, [currentVolume]);
    console.log("currentSpeed " , currentSpeed)

  useEffect(() =>{
     if (fileUrl) {
         audioRef.current.src = fileUrl 
     }
  } , [fileUrl])

  return  <div className="h-screen w-full bg-gray-200">
  <div className="mainDiv h-[85%] w-[100%]  flex items-center justify-center flex-col gap-8">
    <div className="flex items-center justify-center flex-col gap-12">
      <img
        src="https://th.bing.com/th/id/R.2ca8d95f9c191fd075b110df2305a325?rik=c477oHRVbg63qQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-hvHI39pmEPU%2fUcGXas2p3FI%2fAAAAAAAACpg%2fngg10AsvzIg%2fs1600%2fRecording%2bArtist.jpg&ehk=vD3pRG%2fXqpsmQKInnYp4JgCzkROKRFDTq9w5Lj45J6U%3d&risl=&pid=ImgRaw&r=0"
        alt=""
        className=" h-[10rem] w-[10rem] rounded-full object-cover"
      />
      <SongInfo />
      <Lyrics />

      <audio ref={audioRef}></audio>
    </div>
    <div className="fixed bottom-0 w-full flex items-center justify-center flex-col">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="  h-1 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer "
          style={{
            background: `linear-gradient(to right, #facc15 ${
              (progress / duration) * 100 || 0
            }%, #e5e5e5 ${(progress / duration) * 100 || 0}%)`,
          }}
          onTimeUpdate={handleTimeUpdate}
          // style={{
          //   background: `linear-gradient(to right, #facc15 ${
          //     (progress / duration) * 100 || 0
          //   }%, #e5e5e5 ${(progress / duration) * 100 || 0}%)`,
          // }}
        />
        <div className="w-full">
          <HLSPlayer
            progress={progress}
            duration={duration}
            handlePlayMusic={handlePlayMusic}
            handlePauseMusic={handlePauseMusic}
            isPlaying={isPlaying}
            handleFastForward = {handleFastForward}
            handleFastBackward = {handleFastBackward}
            handleDownLoadFile = {handleDownLoadFile}
            currentSpeed = {currentSpeed}
            handleSpeedChange = {handleSpeedChange}
            currentVolume={currentVolume}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
  </div>
</div>
 
}

export default AudioMP3;
