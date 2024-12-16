import { createContext, useState } from "react";

export const UserContext = createContext(null)

export const UserContextProvider = ({children}) =>{
    
    const [userInfo , setUserInfo] = useState(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {})
    const [fileUrl , setFileUrl] = useState(localStorage.getItem("fileUrl") ? localStorage.getItem("fileUrl") : "")

       return <UserContext.Provider value={{userInfo , setUserInfo , fileUrl , setFileUrl}}>
         {children}
       </UserContext.Provider>

}