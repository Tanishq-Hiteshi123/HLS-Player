import Hls from "hls.js";

export const formatTime = (duration) =>{
    // Input :- 99.802 :-

    // Step 1 :- Math.floor (duration) ---> 99 

    // Step 2 :- get the hours from it :- let hours = (99 / 3600) > 0 && duration = 99 % 3600 
    
    let originalDuration = Math.floor(duration);
     
    let hours = originalDuration / 3600;
    let minutes = 0;
    let seconds = 0;
    if (hours > 0) {
        
        originalDuration = originalDuration % 3600;
        
    }


    if (originalDuration > 0) {
          minutes = originalDuration / 60;

         if (minutes > 0){
             originalDuration = originalDuration % 60;
         }

    }

    if (originalDuration > 0){
          seconds = originalDuration;
    }

    let ans = []
   Math.floor(hours) > 9 ? ans.push(Math.floor(hours)) : ans.push("0" + Math.floor(hours))
   Math.floor(minutes) > 9 ? ans.push(Math.floor(minutes)) : ans.push("0" + Math.floor(minutes)) 
   Math.floor(seconds) > 9 ? ans.push(Math.floor(seconds)) : ans.push("0" + Math.floor(seconds))

   return ans.join(":")


     

}

export const identifyTheType = (url) => {
    return new Promise((resolve, reject) => {
      if (Hls.isSupported()) {
        const hls = new Hls();
  
        hls.loadSource(url);
  
        // Wait for the manifest to be parsed
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (hls.levels.some((level) => level.width || level.height)) {
            console.log(hls.levels.length, "video");
            resolve(100000); // Return a value for video
          } else if (hls.levels.length == 1) {
            console.log(hls.audioTracks.length, "audio");
            resolve(90000); // Return a value for audio
          } else {
            reject("Unable to determine file type.");
          }
        });
  
        // Handle errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          reject(`HLS.js error: ${data.details}`);
        });
      } else {
        reject("HLS.js is not supported in this browser.");
      }
    });
  };