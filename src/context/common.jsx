import {  createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";


const AppContext = createContext()

export const AppProvider  = ({children})=>{
    const [addImage,setImageModal] = useState(false)
    const [homesImages,setHomeImages] = useState([])
    const {userInfo} = useSelector((state)=>state.user)
    const clear = (error)=>{
        console.log(error);
        if (error.code === 403) {
            localStorage.removeItem("user");
            toast.error(error.error);
            navigate("/login", { replace: true });
        } else if (error?.response) {
            toast.warning(error.response.data.message);
        }

    }
    return(<AppContext.Provider value={{addImage,setImageModal,userInfo,homesImages,setHomeImages,clear}}>
       {children} 
    </AppContext.Provider>)

}

export const useAppContext = ()=>{
    return useContext(AppContext)
}

