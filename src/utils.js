export const formatTime = (duration) =>{
    // Input :- 99.802 :-

    // Step 1 :- Math.floor (duration) ---> 99 

    // Step 2 :- get the hours from it :- let hours = (99 / 3600) > 0 && duration = 99 % 3600 
    
    let originalDuration = Math.floor(duration);
    console.log("progress Time " , duration)
     
    let hours = originalDuration / 3600;
    let minutes = 0;
    let seconds = 0;
    if (hours > 0) {
        
        originalDuration = originalDuration % 3600;
        
    }

    console.log(originalDuration)

    if (originalDuration > 0) {
        console.log(originalDuration)
          minutes = originalDuration / 60;

         if (minutes > 0){
             originalDuration = originalDuration % 60;
         }

    }

    if (originalDuration > 0){
          seconds = originalDuration;
    }
    // Output :- 00:01:29

    let ans = []
   Math.floor(hours) > 9 ? ans.push(Math.floor(hours)) : ans.push("0" + Math.floor(hours))
   Math.floor(minutes) > 9 ? ans.push(Math.floor(minutes)) : ans.push("0" + Math.floor(minutes)) 
   Math.floor(seconds) > 9 ? ans.push(Math.floor(seconds)) : ans.push("0" + Math.floor(seconds))

   return ans.join(":")


     

}