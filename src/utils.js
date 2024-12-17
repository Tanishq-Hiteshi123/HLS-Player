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
  
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (hls.levels.some((level) => level.width || level.height)) {
            console.log(hls.levels.length, "video");
            resolve("video"); 
          } else if (hls.levels.length == 1) {
            console.log(hls.audioTracks.length, "audio");
            resolve("audio"); 
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


  // export const identifyTheType = (url) => {
  //   return new Promise((resolve, reject) => {
  //     if (!Hls.isSupported()) {
  //       reject("HLS.js is not supported in this browser.");
  //       return;
  //     }
  
  //     const hls = new Hls();
  
  //      console.log("URL " , url)
  //     hls.loadSource(url);
  
     
  //     // hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //     //   console.log("Manifest parsed successfully.");
  
  //     //     console.log(hls.levels[0].height , hls.levels[0].width , hls.levels , hls.audioTracks)

  //     //   if (hls.levels[0].height != 0 || hls.levels[0].width != 0) {
  //     //     console.log("Printing the Levels : " , hls.levels)
          
  //     //     console.log("Identified as video stream.");
  //     //     resolve("video");
  //     //   } else if (hls.audioTracks.length > 0) {
  //     //     console.log("Identified as audio stream.");
  //     //     resolve("audio"); 
  //     //   } else {
  //     //     reject("Unable to determine the file type from the manifest.");
  //     //   }
  //     // });

  //     hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
  //       var streams = data.levels;
      
  //       for (var i = 0; i < streams.length; i++) {
  //         var stream = streams[i];
  //         console.log(stream)
  //         if (stream.type === 'video') {
  //           console.log('Video stream found:', stream);
  //           resolve("video")
  //         } else if (stream.type === 'audio') {
  //           console.log("Audio stream Found: " , stream)
  //           resolve("audio")
  //         }
  //       }
  //     });
  
  //     // Handle errors during parsing or loading
  //     hls.on(Hls.Events.ERROR, (event, data) => {
  //       console.error("HLS.js error:", data);
  //       reject(`HLS.js error: ${data.details}`);
  //     });
  //   });
  // };
  


  //  Available Speeds Left :-
  export const availableSpeed = [
    {
       label : "1.0x",
       value : 1
    },
    {
       label : "1.25x",
       value : 1.25
    },
    {
       label : "1.5x",
       value : 1.5
    },
    {
       label : "1.75x",
       value : 1.75
    },
    {
       label : "2.0x",
       value : 2
    },
  ]