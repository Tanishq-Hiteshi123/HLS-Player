import React, { useEffect, useState } from "react";
import { IoMdMusicalNote } from "react-icons/io";
import { formatTime } from "../utils";
import { MdSkipPrevious } from "react-icons/md";
import { CgPlayPauseO } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosFastforward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
function HLSPlayer({
  progress,
  duration,
  handlePlayMusic,
  handlePauseMusic,
  isPlaying,
  handleFastForward,
  handleFastBackward
}) {
  return (
    <div className="hlsPlayer w-full h-[8%]   bg-gray-900 flex items-center justify-between px-2 pt-4 pb-2 text-white">
      <div className="flex items-center justify-start flex-col w-[100%]">
        <div className="flex  justify-start w-[100%] items-center">
          <IoMdMusicalNote size={"1.3rem"} color="white" />
          <h1>Problem - {"Dummy"}</h1>
        </div>
        <div className="flex items-center justify-between w-full mt-4 ">
          <h2 className="startTime">{formatTime(progress)}</h2>
          <h2 className="endTime">{formatTime(duration)}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <FaBackward className="cursor-pointer" size={"1.58rem"} onClick={handleFastBackward}/>

        <MdSkipPrevious className="cursor-pointer" size={"1.58rem"}  />

        {isPlaying ? (
          <CgPlayPauseO
            className="cursor-pointer"
            size={"2.5rem"}
            onClick={handlePauseMusic}
          />
        ) : (
          <FaPlay
            className="cursor-pointer"
            size={"1.5rem"}
            onClick={handlePlayMusic}
          />
        )}

        <CgPlayTrackNext className="cursor-pointer" size={"1.58rem"} />

        <IoIosFastforward size={"1.58rem"} className="cursor-pointer" onClick={handleFastForward}/>

        <IoCloseSharp
          className="cursor-pointer"
          size={"1.32rem"}
          color="white"
        />
      </div>
    </div>
  );
}

export default HLSPlayer;
