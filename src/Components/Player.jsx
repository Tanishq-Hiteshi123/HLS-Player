import { IoMdMusicalNote } from "react-icons/io";
import { MdSkipPrevious } from "react-icons/md";
import { CgPlayPauseO } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { formatTime } from "../utils";
import { useEffect } from "react";
import { IoIosFastforward } from "react-icons/io";

function Player({
  isPlaying,
  setIsPlaying,
  songs,
  playMusic,
  pauseMusic,
  currentSong,
  duration,
  progress,
  setCurrentSong,
  setDuration,
  setProgress,
  sound,
  setSound,
  handleForward
}) {


  const handlePreviousSong = () => {
    if (currentSong == 0) {
       setCurrentSong(songs.length - 1);
    }
    else {
       
      setCurrentSong((currentSong - 1) % songs.length)
    }
  };
  const handleNextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length)
  };

  useEffect(() =>{
    if (pauseMusic) {
      pauseMusic();
    }

     
     setProgress(0)
     setDuration(0)
     setIsPlaying(false)
     setSound(null)
   
  } , [currentSong])


  return (
    <div className="w-full h-[8%]   bg-gray-900 flex items-center justify-between px-2 pt-4 pb-2 text-white">
      <div className="flex items-center justify-start flex-col w-[100%]">
        <div className="flex  justify-start w-[100%] items-center">
          <IoMdMusicalNote size={"1.3rem"} color="white" />
          <h1>Problem - {songs[currentSong].title}</h1>
        </div>
        <div className="flex items-center justify-between w-full mt-4 ">
          <h2 className="startTime">{formatTime( progress)}</h2>
          <h2 className="endTime">{formatTime(duration)}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <MdSkipPrevious
          className="cursor-pointer"
          size={"1.58rem"}
          onClick={handlePreviousSong}
          
        />

        {isPlaying ? (
          <CgPlayPauseO
            className="cursor-pointer"
            size={"2.5rem"}
            onClick={pauseMusic}
          />
        ) : (
          <FaPlay
            className="cursor-pointer"
            size={"1.5rem"}
            onClick={playMusic}
          />
        )}

        <CgPlayTrackNext
          className="cursor-pointer"
          size={"1.58rem"}
          onClick={handleNextSong}
        />

        <IoIosFastforward size={"1.58rem"} className="cursor-pointer"  onClick={handleForward}/>

        <IoCloseSharp
          className="cursor-pointer"
          size={"1.32rem"}
          color="white"
        />
      </div>
    </div>
  );
}

export default Player;
