import React, { useContext, useEffect, useRef, useState } from "react";
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

  const handlePlayMusic = () => {
    videoRef.current.play();
    setIsPlaying(true);
    intervalRef.current = setInterval(handleTimeUpdate, 1000);
  };

  const handlePauseMusic = () => {
    videoRef.current.pause();
    setIsPlaying(false);
    clearInterval(intervalRef.current);
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

  const handleFastForward = () => {
    const updatedProgress = progress + 10;
    setProgress(updatedProgress);
    videoRef.current.currentTime = updatedProgress;
  };

  const handleFastBackward = () => {
    const updatedProgress = Math.max(progress - 10, 0);
    setProgress(updatedProgress);
    videoRef.current.currentTime = updatedProgress;
  };

  const handleSpeedChange = (e) => {
    setCurrentSpeed(Number(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setCurrentVolume(Number(e.target.value));
  };

  useEffect(() => {
    videoRef.current.src = fileUrl;
  }, [fileUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = currentSpeed;
    }
  }, [currentSpeed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = currentVolume;
    }
  }, [currentVolume]);

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
              handlePlayMusic={handlePlayMusic}
              handlePauseMusic={handlePauseMusic}
              isPlaying={isPlaying}
              handleFastForward={handleFastForward}
              handleFastBackward={handleFastBackward}
              currentSpeed={currentSpeed}
              handleSpeedChange={handleSpeedChange}
              currentVolume={currentVolume}
              handleVolumeChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoMP4;
