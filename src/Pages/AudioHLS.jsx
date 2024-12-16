import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../Context/userContext";
import Hls from "hls.js";
import SongInfo from "../Components/SongInfo";
import Lyrics from "../Components/Lyrics";
import HLSPlayer from "../Components/HLSPlayer";

function AudioHLS() {
  const { fileUrl } = useContext(UserContext);
  const audioRef = useRef(null);
  
 
  console.log(fileUrl, "this is file URL   ");

  //  Step - 1 :- On loading of the page check the HLS Support :-
  useEffect(() => {
    if (!Hls.isSupported()) {
      console.log("HLS does not support");
      return;
    } else {
      const hls = new Hls();
      console.log(fileUrl);
      hls.loadSource(fileUrl);
      hls.attachMedia(audioRef.current);

      //   hls.on(Hls.Events.MANIFEST_PARSED , () =>{
      //        // Check video levels for resolution
      //     if (hls.levels.some((level) => level.width > 0 || level.height > 0)) {
      //         console.log("object of video")
      //         hls.attachMedia(videoRef.current)
      //       } else if(hls.levels[0].audioCodec) {
      //         console.log("object of Audio")
      //         hls.attachMedia(audioRef.current);
      //       }

      //   })
    }
  }, [fileUrl]);

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="mainDiv h-[85%] w-[100%]  flex items-center justify-center flex-col gap-8">
        <div className="flex items-center justify-center flex-col gap-5">
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
            //   onChange={handleSeek}
              className="  h-1 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer "
              // style={{
              //   background: `linear-gradient(to right, #facc15 ${
              //     (progress / duration) * 100 || 0
              //   }%, #e5e5e5 ${(progress / duration) * 100 || 0}%)`,
              // }}
            //   onTimeUpdate={handleTimeUpdate}
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
  );
}

export default AudioHLS;
