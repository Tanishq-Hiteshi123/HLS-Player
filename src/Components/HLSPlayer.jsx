import React, { useEffect } from "react";
import { availableSpeed, formatTime } from "../utils";
import { MdSkipPrevious } from "react-icons/md";
import { CgPlayPauseO } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { IoIosFastforward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { CgLoadbarSound } from "react-icons/cg";
function HLSPlayer({
  progress,
  duration,
  isPlaying,
  handleTimeUpdate,
  selectedResolution,
  availableResolutions,
  isVideo,
  currentSpeed,
  currentVolume,
  ElemRef,
  setCurrentSpeed,
  setCurrentVolume,
  setIsPlaying,
  intervalRef,
  setProgress,
  fileUrl,
  hlsRef,
  setSelectedResolution,
}) {
  const handlePlayMusic = () => {
    ElemRef?.current?.play();
    setIsPlaying(true);
    intervalRef.current = setInterval(handleTimeUpdate, 1000);
  };

  const handlePauseMusic = () => {
    ElemRef?.current?.pause();
    setIsPlaying(false);
    clearInterval(intervalRef?.current);
  };

  const handleFastForward = () => {
    const updatedProgress = progress + 10;
    setProgress(updatedProgress);
    ElemRef.current.currentTime = updatedProgress;
  };

  const handleFastBackward = () => {
    const updatedProgress = Math.max(progress - 10, 0);
    setProgress(updatedProgress);
    ElemRef.current.currentTime = updatedProgress;
  };

  const handleSpeedChange = (e) => {
    setCurrentSpeed(Number(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setCurrentVolume(Number(e.target.value));
  };

  const handleResolutionChange = (event) => {
    const levelIndex = parseInt(event.target.value);
    setSelectedResolution(event.target.value);

    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
    }
  };

  useEffect(() => {
    ElemRef.current.src = fileUrl;
  }, [fileUrl]);

  useEffect(() => {
    if (ElemRef.current) {
      ElemRef.current.playbackRate = currentSpeed;
    }
  }, [currentSpeed]);

  useEffect(() => {
    if (ElemRef.current) {
      ElemRef.current.volume = currentVolume;
    }
  }, [currentVolume]);

  return (
    <div className="hlsPlayer w-full h-[10%] bg-gray-900 flex items-center justify-between px-4 py-2 text-white rounded-md shadow-md">
      <div className="flex items-center gap-2">
        {isPlaying ? (
          <img
            className="h-5 w-5"
            src="https://cdn.pixabay.com/animation/2024/06/04/16/39/16-39-28-355_512.gif"
            alt=""
          />
        ) : (
          <CgLoadbarSound size={"1.5rem"} />
        )}
        <h1 className="text-lg font-medium">Now Playing: {"Dummy"}</h1>
      </div>

      <div className="flex items-center gap-4">
        <FaBackward
          className="cursor-pointer hover:scale-110 transition-transform"
          size={"1.5rem"}
          onClick={handleFastBackward}
        />

        <MdSkipPrevious
          className="cursor-pointer hover:scale-110 transition-transform"
          size={"2rem"}
        />

        {isPlaying ? (
          <CgPlayPauseO
            className="cursor-pointer hover:scale-110 transition-transform"
            size={"2.5rem"}
            onClick={handlePauseMusic}
          />
        ) : (
          <FaPlay
            className="cursor-pointer hover:scale-110 transition-transform"
            size={"1.8rem"}
            onClick={handlePlayMusic}
          />
        )}

        <CgPlayTrackNext
          className="cursor-pointer hover:scale-110 transition-transform"
          size={"2rem"}
        />

        <IoIosFastforward
          size={"1.5rem"}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={handleFastForward}
        />

        <div className="flex w-[80%]  items-center justify-end gap-2">
          {currentVolume != 0 ? (
            <FaVolumeUp size={"1.3rem"} />
          ) : (
            <FaVolumeMute size={"1.3rem"} />
          )}
          <input
            type="range"
            onChange={handleVolumeChange}
            value={currentVolume}
            className="h-1"
            id="volume"
            name="volume"
            step={"0.1"}
            min="0"
            max="1"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-sm">{formatTime(progress)}</h2>
          <h2 className="text-sm">{formatTime(duration)}</h2>
        </div>

        {isVideo && (
          <select
            value={selectedResolution}
            onChange={handleResolutionChange}
            className="p-2 bg-gray-700 text-white rounded"
          >
            {availableResolutions?.map((resolution) => (
              <option key={resolution.index} value={resolution.index}>
                {console.log(resolution)}
                {resolution.label}
              </option>
            ))}
          </select>
        )}

        {/* For Speeding Manipulation */}
        <select
          value={currentSpeed}
          onChange={handleSpeedChange}
          className="p-2 bg-gray-700 text-white rounded"
        >
          {availableSpeed.map((speedDetails) => (
            <option key={speedDetails.label} value={speedDetails.value}>
              {speedDetails.label}
            </option>
          ))}
        </select>

        <HiDownload
          size={"1.8rem"}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
}

export default HLSPlayer;
