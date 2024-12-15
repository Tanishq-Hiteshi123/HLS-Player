import { useEffect, useRef, useState } from "react";
import Lyrics from "../Components/Lyrics";
import Player from "../Components/Player";
import SongInfo from "../Components/SongInfo";
import { songsData } from "../songs";
import { Howl } from "howler";
function Main() {
  const [songs, setSongs] = useState(songsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [sound, setSound] = useState(null);
  const [progress, setProgress] = useState(0); // Progress in seconds
  const [duration, setDuration] = useState(0); // Duration in seconds

  const intervalRef = useRef(null);

  const handleSeek = (e) => {
    // console.log(e)
    if (e != undefined) {
      const seekTime = (e.target.value / 100) * duration; // Calculate the new time
      setProgress(seekTime);
      if (sound) {
        sound.seek(seekTime); // Set the audio position
      }
    } else {
        // console.log("Else " , sound.seek())
        const seekTime = (1 / 100) * duration; // Calculate the new time
        console.log(seekTime)
        setProgress(seekTime);
        console.log("object " , sound)

      if (sound) {
        sound.seek(seekTime); // Set the audio position
      }
    }
  };
  const playMusic = () => {
    // Create a Howl instance if not already created

    setIsPlaying(true);

    if (!sound) {
      const newSound = new Howl({
        src: [songsData[currentSong].src],
        html5: true,
        onload: () => {
          setDuration(newSound.duration());  
          setProgress(newSound.seek()); 
          updateProgress()
          
        },
        onend: () => {
          setIsPlaying(false);
          clearInterval(intervalRef.current);
          setProgress(0)
        },
      });

      setSound(newSound);
    updateProgress()
    newSound.play();
    setProgress(newSound.seek());
      
      intervalRef.current = setInterval(updateProgress, 1000);
    } else {
      sound.play();
      setProgress(sound.seek());
      updateProgress()
      intervalRef.current = setInterval(updateProgress, 1000);
    }
  };

  const pauseMusic = () => {
    setIsPlaying(false);
    sound?.pause();
    clearInterval(intervalRef.current);
  };

  const updateProgress = () => {
    console.log("object upper " , sound , progress )

    if (sound) {
      setProgress(sound.seek());
    }
 
  };

useEffect(() =>{
     updateProgress()
} , [sound , isPlaying])

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="mainDiv h-[85%] w-[90%] flex items-center justify-center flex-col gap-8">
        <img
          src="https://th.bing.com/th/id/R.2ca8d95f9c191fd075b110df2305a325?rik=c477oHRVbg63qQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-hvHI39pmEPU%2fUcGXas2p3FI%2fAAAAAAAACpg%2fngg10AsvzIg%2fs1600%2fRecording%2bArtist.jpg&ehk=vD3pRG%2fXqpsmQKInnYp4JgCzkROKRFDTq9w5Lj45J6U%3d&risl=&pid=ImgRaw&r=0"
          alt=""
          className="h-[30%] w-[15%] rounded-full object-cover"
        />
        <SongInfo />
        <Lyrics />
      </div>
      <div className="fixed bottom-0 w-full flex items-center justify-center flex-col">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-1  bg-gray-200 rounded-lg appearance-none cursor-pointer "
          style={{
            background: `linear-gradient(to right, #facc15 ${
              (progress / duration) * 100 || 0
            }%, #e5e5e5 ${(progress / duration) * 100 || 0}%)`,
          }}
        />

        <Player
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          sound={sound}
          duration={duration}
          progress={progress}
          setProgress={setProgress}
          setDuration={setDuration}
          setSound={setSound}
        />
      </div>
    </div>
  );
}

export default Main;
