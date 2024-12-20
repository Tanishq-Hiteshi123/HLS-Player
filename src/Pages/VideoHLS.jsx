import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/userContext";
import Hls from "hls.js";
import HLSPlayer from "../Components/HLSPlayer";

function VideoHLS() {
  const { fileUrl } = useContext(UserContext);
  const videoRef = useRef(null);

  const location = window.location.pathname;

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableResolutions, setAvailableResolutions] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState("auto");
  const hlsRef = useRef(null);
  const intervalRef = useRef(null);
  const [isVideo, setIsVideo] = useState(
    location.includes("video") ? true : false
  );
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(0.5);

  useEffect(() => {
    setIsVideo(location.includes("video") ? true : false);
  }, [location]);
  useEffect(() => {
    if (!Hls.isSupported()) {
      console.log("HLS is not supported");
      return;
    }

    const hls = new Hls();
    hlsRef.current = hls;

    hls.loadSource(fileUrl);
    hls.attachMedia(videoRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      const levels = hls.levels.map((level, index) => ({
        label: `${level.height}p (${Math.round(level.bitrate / 1000)} kbps)`,
        index,
      }));

      setAvailableResolutions([{ label: "Auto", index: -1 }, ...levels]);
    });

    return () => {
      hls.destroy();
    };
  }, [fileUrl]);

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
              availableResolutions={availableResolutions}
              selectedResolution={selectedResolution}
              setSelectedResolution={setSelectedResolution}
              isVideo={isVideo}
              hlsRef={hlsRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoHLS;
