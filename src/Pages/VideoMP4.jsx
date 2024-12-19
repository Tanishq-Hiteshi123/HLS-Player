import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/userContext";
import HLSPlayer from "../Components/HLSPlayer";

function VideoMP4() {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { fileUrl } = useContext(UserContext);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(0.5);

  const handleSeek = (event) => {
    videoRef.current.currentTime = event.target.value;
    setProgress(event.target.value);
  };
  const handleTimeUpdate = () => {
    setDuration(videoRef.current.duration);
    setProgress(videoRef.current.currentTime);

    if (videoRef.current.currentTime >= videoRef.current.duration) {
      setIsPlaying(false);
      setProgress(0);
      clearInterval(intervalRef.current);
    }
  };
  useEffect(() => {
    if (fileUrl) {
      videoRef.current.src = fileUrl;
    }
  }, [fileUrl]);

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="mainDiv h-[85%] w-[100%] flex items-center justify-center flex-col gap-8">
        <div className="h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
          <video className="h-[70%] w-[70%] rounded-xl" ref={videoRef}></video>
        </div>
        <div className="fixed bottom-0 w-full flex items-center justify-center flex-col">
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleSeek}
            className="h-1 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
              ElemRef={videoRef}
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

export default VideoMP4;
