import React from "react";
import { IoMdMusicalNote } from "react-icons/io";
import { availableSpeed, formatTime } from "../utils";
import { MdSkipPrevious } from "react-icons/md";
import { CgPlayPauseO } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
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
  handlePlayMusic,
  handlePauseMusic,
  isPlaying,
  handleFastForward,
  handleFastBackward,
  selectedResolution,
  availableResolutions,
  handleResolutionChange,
  isVideo,
  handleDownLoadFile,
  currentSpeed,
  handleSpeedChange,
  currentVolume,
  handleVolumeChange
}) {
  return (
    <div className="hlsPlayer w-full h-[10%] bg-gray-900 flex items-center justify-between px-4 py-2 text-white rounded-md shadow-md">
      {/* Left Section: Song Info */}
      <div className="flex items-center gap-2">
         {
           isPlaying ? <img className="h-5 w-5" src="https://cdn.pixabay.com/animation/2024/06/04/16/39/16-39-28-355_512.gif" alt="" /> :  <CgLoadbarSound size={"1.5rem"}  />
         }
        <h1 className="text-lg font-medium">Now Playing: {"Dummy"}</h1>
      </div>

      {/* Center Section: Controls */}
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

        {/*  Input range for volume Controller  */}
        
       <div className="flex w-[80%]  items-center justify-end gap-2">
           {
            currentVolume != 0 ? <FaVolumeUp size={"1.3rem"}/> : <FaVolumeMute size={"1.3rem"} />
            }
           <input type="range" onChange={handleVolumeChange} value={currentVolume} className="h-1" id="volume" name="volume" step={"0.1"} min="0" max="1" />
       </div>
      </div>

      {/* Right Section: Resolution and Progress */}
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
            {availableResolutions.map((resolution) => (
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
          onClick={handleDownLoadFile}
          size={"1.8rem"}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
}

export default HLSPlayer;
