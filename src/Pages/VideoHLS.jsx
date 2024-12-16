import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/userContext";
import Hls from "hls.js";
import SongInfo from "../Components/SongInfo";
import Lyrics from "../Components/Lyrics";
import HLSPlayer from "../Components/HLSPlayer";

function VideoHLS() {
  const { fileUrl } = useContext(UserContext);
  const videoRef = useRef(null);


    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null)
  
 
  // console.log(fileUrl, "this is file URL   ");

  //  Step - 1 :- On loading of the page check the HLS Support :-
  useEffect(() => {
    if (!Hls.isSupported()) {
      console.log("HLS does not support");
      return;
    } else {
      const hls = new Hls();
      console.log(fileUrl);
      hls.loadSource(fileUrl);
      hls.attachMedia(videoRef.current);

    
    }
  }, [fileUrl]);


  const handleSeek = (event) => {
  
   
        videoRef.current.currentTime = event.target.value; 
   
    // console.log(videoRef.current.currentTime , "current Audio Value")
    setProgress(event.target.value); 

  };

  // console.log(videoRef , videoRef)

  const handlePlayMusic = () => {
    console.log("Playing the music");
  
    console.log("Playing the audio " , videoRef)
      videoRef.current.play()
   
  
    setIsPlaying(!isPlaying);
    intervalRef.current = setInterval(handleTimeUpdate , 1000)
  };
  const handlePauseMusic = () => {
    console.log("Paused The Music");
    console.log(videoRef.current)

    videoRef.current.pause()
   
 
    setIsPlaying(!isPlaying);
    clearInterval(intervalRef.current)
  };

  const handleTimeUpdate = (e) =>{
    // console.log(progress)
    // console.log(videoRef.current.currentTime , videoRef.current.duration)
    
        setDuration(videoRef.current.duration)
        setProgress(videoRef.current.currentTime)
  

    if (videoRef.current) {
        if (Math.floor(videoRef.current.currentTime) == Math.floor(videoRef.current.duration)) {
            setIsPlaying(false);
            setProgress(0)
            clearInterval(intervalRef.current)
      }
    }
 
  }

  const handleFastForward = () =>{
    
    //   console.log("handling fast forwarding")
    //   console.log(videoRef.current.currentTime , progress)
      const updatedProgress = progress + 10;

    
      setProgress(updatedProgress)
   
        videoRef.current.currentTime = updatedProgress;
    

  }
  const handleFastBackward = () => {
       console.log("Handling the fast Backward")
       const updatedProgress = progress - 10;
       if (updatedProgress < 0) {
         setProgress(0);
        
            videoRef.current.currentTime = 0;
        
       }
       else {
           setProgress(updatedProgress);
          
            videoRef.current.currentTime = updatedProgress;
        
         
       }

  }

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="mainDiv h-[85%] w-[100%]  flex items-center justify-center flex-col gap-8">
        <div className=" h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
         

          <video className="h-[70%] w-[70%]" ref={videoRef}></video>
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
              />
            </div>
          </div>
      </div>
    </div>
  );
}

export default VideoHLS;
