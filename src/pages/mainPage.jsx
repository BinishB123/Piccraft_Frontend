import { useState } from "react"
import Header from "../components/header"
import Home from "../components/home"
import ModalForImageupload from "../components/modal"
import { useAppContext } from "../context/common"


function Gallery(){
   const {addImage} = useAppContext()
    return(<>
    <div className="w-[100%] h-auto">
        <Header/>
        <Home/>

    </div>
    {addImage&&<ModalForImageupload/>

    }
    </>)
}

export default Gallery