// import React, { useEffect, useState } from "react";
// import { IoMdMusicalNote } from "react-icons/io";
// import { formatTime } from "../utils";
// import { MdSkipPrevious } from "react-icons/md";
// import { CgPlayPauseO } from "react-icons/cg";
// import { CgPlayTrackNext } from "react-icons/cg";
// import { IoCloseSharp } from "react-icons/io5";
// import { IoIosFastforward } from "react-icons/io";
// import { FaPlay } from "react-icons/fa";
// import { FaBackward } from "react-icons/fa6";
// function HLSPlayer({
//   progress,
//   duration,
//   handlePlayMusic,
//   handlePauseMusic,
//   isPlaying,
//   handleFastForward,
//   handleFastBackward,
//   selectedResolution,
//   availableResolutions,
//   handleResolutionChange
// }) {
//   return (
//     <div className="hlsPlayer w-full h-[8%]   bg-gray-900 flex items-center justify-between px-2 pt-4 pb-2 text-white">
//       <div className="flex items-center justify-start flex-col w-[100%]">
//         <div className="flex  justify-start w-[100%] items-center">
//           <IoMdMusicalNote size={"1.3rem"} color="red" className="mx-2" />
//           <h1>Problem - {"Dummy"}</h1>
//         </div>
//         <div className="flex items-center justify-between w-full mt-4 ">
//           <h2 className="startTime">{formatTime(progress)}</h2>
//           <h2 className="endTime">{formatTime(duration)}</h2>
//         </div>
//       </div>

//       <div className="flex items-center gap-2 mb-5">

//       <select
//             value={selectedResolution}
//             onChange={handleResolutionChange}
//             className="mt-4 p-2 bg-white text-black rounded"
//           >
//             {availableResolutions.map((resolution) => (
//               <option key={resolution.index} value={resolution.index}>
//                 {resolution.label}
//               </option>
//             ))}
//           </select>

//         <FaBackward className="cursor-pointer" size={"1.28rem"} onClick={handleFastBackward}/>

//         <MdSkipPrevious className="cursor-pointer" size={"1.58rem"}  />

//         {isPlaying ? (
//           <CgPlayPauseO
//             className="cursor-pointer"
//             size={"2.5rem"}
//             onClick={handlePauseMusic}
//           />
//         ) : (
//           <FaPlay
//             className="cursor-pointer"
//             size={"1.5rem"}
//             onClick={handlePlayMusic}
//           />
//         )}

//         <CgPlayTrackNext className="cursor-pointer" size={"1.58rem"} />

//         <IoIosFastforward size={"1.58rem"} className="cursor-pointer" onClick={handleFastForward}/>

//         <IoCloseSharp
//           className="cursor-pointer"
//           size={"1.32rem"}
//           color="white"
//         />
//       </div>
//     </div>
//   );
// }

// export default HLSPlayer;

import React, { useState } from "react";
import { IoMdMusicalNote } from "react-icons/io";
import { formatTime } from "../utils";
import { MdSkipPrevious } from "react-icons/md";
import { CgPlayPauseO } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosFastforward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";

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
}) {

  return (
    <div className="hlsPlayer w-full h-[10%] bg-gray-900 flex items-center justify-between px-4 py-2 text-white rounded-md shadow-md">
      {/* Left Section: Song Info */}
      <div className="flex items-center gap-2">
        <IoMdMusicalNote size={"1.5rem"} color="red" />
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
      </div>

      {/* Right Section: Progress and Settings */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-sm">{formatTime(progress)}</h2>
          <h2 className="text-sm">{formatTime(duration)}</h2>
        </div>

       

        <IoCloseSharp
          size={"1.8rem"}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

  
    </div>
  );
}

export default HLSPlayer;
