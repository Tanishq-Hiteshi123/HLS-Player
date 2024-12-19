import { useContext, useEffect, useRef, useState } from "react";
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
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(0.5);

  const handleSeek = (event) => {
    audioRef.current.currentTime = event.target.value;
    setProgress(event.target.value);
  };

  const handleTimeUpdate = () => {
    setDuration(audioRef.current.duration);
    setProgress(audioRef.current.currentTime);

    if (audioRef.current) {
      if (
        Math.floor(audioRef.current.currentTime) >=
        Math.floor(audioRef.current.duration)
      ) {
        setIsPlaying(false);
        setProgress(0);
        clearInterval(intervalRef.current);
      }
    }
  };

  useEffect(() => {
    if (fileUrl) {
      audioRef.current.src = fileUrl;
    }
  }, [fileUrl]);

  return (
    <div className="h-screen w-full bg-gray-200">
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
          />
          <div className="w-full">
            <HLSPlayer
              progress={progress}
              duration={duration}
              fileUrl={fileUrl}
              isPlaying={isPlaying}
              setCurrentSpeed={setCurrentSpeed}
              setCurrentVolume={setCurrentVolume}
              setProgress={setProgress}
              currentSpeed={currentSpeed}
              currentVolume={currentVolume}
              ElemRef={audioRef}
              setIsPlaying={setIsPlaying}
              intervalRef={intervalRef}
              handleTimeUpdate={handleTimeUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioMP3;
