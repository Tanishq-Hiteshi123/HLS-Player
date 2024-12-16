import React, { useContext, useEffect, useRef, useState } from "react";
import SongInfo from "../Components/SongInfo";
import Lyrics from "../Components/Lyrics";
import HLSPlayer from "../Components/HLSPlayer";
import Hls from "hls.js";
import { UserContext } from "../Context/userContext";
function MainHLS() {
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { fileUrl } = useContext(UserContext);
  const intervalRef = useRef(null)

  //  Step - 1 :- On loading of the page check the HLS Support :-
  useEffect(() => {
    if (!Hls.isSupported()) {
      console.log("HLS does not support");
      return;
    } else {
      const hls = new Hls();
      console.log(fileUrl)
      hls.loadSource(fileUrl);
      hls.attachMedia(audioRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED , () =>{
           // Check video levels for resolution
        if (hls.levels.some((level) => level.width > 0 || level.height > 0)) {
            console.log("object of video")
            hls.attachMedia(videoRef.current)
          } else if(hls.levels[0].audioCodec) {
            console.log("object of Audio")
            hls.attachMedia(audioRef.current);
          }
        
      })
  
    
    }


  }, [fileUrl]);

  const handleSeek = (event) => {
  
    if (audioRef.current) {
        audioRef.current.currentTime = event.target.value; 
    }
    else {
           videoRef.current.currentTime = event.target.value; 
       }
    // console.log(audioRef.current.currentTime , "current Audio Value")
    setProgress(event.target.value); 

  };

  console.log(videoRef , audioRef)

  const handlePlayMusic = () => {
    console.log("Playing the music");
   if (audioRef.current) {
    console.log("Playing the audio " , audioRef)
      audioRef.current.play()
   }
   else {
     videoRef.current.play()
   }
    setIsPlaying(!isPlaying);
    intervalRef.current = setInterval(handleTimeUpdate , 1000)
  };
  const handlePauseMusic = () => {
    console.log("Paused The Music");
    console.log(audioRef.current)
   if (audioRef.current) {
    audioRef.current.pause()
   }
   else {
     videoRef.current.pause()
   }
    setIsPlaying(!isPlaying);
    clearInterval(intervalRef.current)
  };

  const handleTimeUpdate = (e) =>{
    // console.log(progress)
    // console.log(audioRef.current.currentTime , audioRef.current.duration)
    if (audioRef.current) {
        setDuration(audioRef.current.duration)
        setProgress(audioRef.current.currentTime)
    }
    else {
        setDuration(videoRef.current.duration)
        setProgress(videoRef.current.currentTime)
    }

    if (audioRef.current) {
        if (Math.floor(audioRef.current.currentTime) == Math.floor(audioRef.current.duration)) {
            setIsPlaying(false);
            setProgress(0)
            clearInterval(intervalRef.current)
      }
    }
    else {
        if (Math.floor(videoRef.current.currentTime) == Math.floor(videoRef.current.duration)) {
            setIsPlaying(false);
            setProgress(0)
            clearInterval(intervalRef.current)
      }
    }
  }

  const handleFastForward = () =>{
    
    //   console.log("handling fast forwarding")
    //   console.log(audioRef.current.currentTime , progress)
      const updatedProgress = progress + 10;

    
      setProgress(updatedProgress)
     if (audioRef.current) {
        audioRef.current.currentTime = updatedProgress;
     }
     else {
        videoRef.current.currentTime = updatedProgress;
     }

  }
  const handleFastBackward = () => {
       console.log("Handling the fast Backward")
       const updatedProgress = progress - 10;
       if (updatedProgress < 0) {
         setProgress(0);
         if (audioRef.current) {
            audioRef.current.currentTime = 0;
         }
         else {
            videoRef.current.currentTime = 0;
         }
       }
       else {
           setProgress(updatedProgress);
           if (audioRef.current) {
            audioRef.current.currentTime = updatedProgress;
         }
         else {
            videoRef.current.currentTime = updatedProgress;
         }
         
       }

  }
 
  console.log(progress , audioRef.current)
  return (
    <div>
      <div className="h-screen w-full bg-gray-200">
        <div className="mainDiv h-[85%] w-[100%]  flex items-center justify-center flex-col gap-8">
         {
             audioRef.current ? <div>
                    <img
            src="https://th.bing.com/th/id/R.2ca8d95f9c191fd075b110df2305a325?rik=c477oHRVbg63qQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-hvHI39pmEPU%2fUcGXas2p3FI%2fAAAAAAAACpg%2fngg10AsvzIg%2fs1600%2fRecording%2bArtist.jpg&ehk=vD3pRG%2fXqpsmQKInnYp4JgCzkROKRFDTq9w5Lj45J6U%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            className="h-[30%] w-[15%] rounded-full object-cover"
          />
          <SongInfo />
          <Lyrics />

          <audio ref={audioRef}></audio>
             </div> : <div>
            <video className="w-[80%] h-[70vh]" ref={videoRef}></video>
             </div>
         }
          {/* Progress Bar */}
          <div className="fixed bottom-0 w-full flex items-center justify-center flex-col">
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="  h-1 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer "
              // style={{
              //   background: `linear-gradient(to right, #facc15 ${
              //     (progress / duration) * 100 || 0
              //   }%, #e5e5e5 ${(progress / duration) * 100 || 0}%)`,
              // }}
              onTimeUpdate={handleTimeUpdate}
              style={{
                background: `linear-gradient(to right, #facc15 ${
                  (progress / duration) * 100 || 0
                }%, #e5e5e5 ${(progress / duration) * 100 || 0}%)`,
              }}
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
    </div>
  );
}

export default MainHLS;
