import {  createContext, useContext, useState } from "react";


const AppContext = createContext()

export const AppProvider  = ({children})=>{
    const [addImage,setImageModal] = useState(false)
    return(<AppContext.Provider value={{addImage,setImageModal}}>
       {children} 
    </AppContext.Provider>)

}

export const useAppContext = ()=>{
    return useContext(AppContext)
}

