import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/common";
import { IoIosCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function ModalForImageupload() {
    const {setImageModal} = useAppContext()
    const [images,setImages] = useState([])
    const [orginal,files] = useState([])
    const imageInputRef = useRef()

    const addImages = (files)=>{
        const updatedimages = []
        for (let index = 0; index < files.length; index++) {
        updatedimages.push(URL.createObjectURL(files[index]))
        }
        setImages(updatedimages)  
    }
    
  return (
    <>
      <div className="fixed inset-0 bg-green-900/40 backdrop-blur flex items-center justify-center transition-opacity">
        <div className="w-[100%] h-[720px] flex flex-col justify-center items-center">
          <div className="w-[80%] h-[30px]  flex justify-end cursor-pointer">
            <div className="w-[5%] h-full bg-green-950 text-center rounded-t-md text-white font-semibold text-xl" onClick={()=>setImageModal(false)}>
              <h1>X</h1>
            </div>
          </div>
          <div className={`w-[80%] h-[600px] bg-white rounded-sm border-2 border-green-200 ${images.length<1?"flex justify-center items-center":"flex flex-wrap justify-center space-x-2 space-y-3  items-center overflow-y-scroll "}`}>
           {
            images.length<1?<div className=" bg-green-100 w-[80%] cursor-pointer h-[400px] flex flex-col justify-center items-center outline-dotted outline-green-500 text-center" onClick={()=>{
                imageInputRef.current.click()
            }}>
            <h1 className=" text-green-800 text-lg font-semibold">Click To Add Your Images</h1>
            <IoIosCloudUpload  className="text-4xl" />
           <input type="file" multiple className="hidden" ref={imageInputRef}  onChange={(e)=>{
            addImages(e.target.files)
                
            }}/>
           </div>:(images.map((data,index)=>(
            <>
            <div className="w-[30%] h-[250px] bg-red-400 flex flex-col items-center shadow-md">
                <div  className="relative w-full h-[250px] bg-cover bg-center flex flex-col items-end  justify-end    overflow-hidden  bg-white "
                  style={{ backgroundImage: `url(${data})` }}>
                 {/* <img src={data} key={index} alt="" className="  object-cover"  /> */}
                 
                <div className="h-[80px] w-[100%]  cursor-pointer  bg-gradient-to-t from-black  flex flex-col justify-evenly items-center">
                    <div><h1 className="text-white">No Tittle Name</h1></div>
                    <div className="w-[100%] h-[30px] flex justify-evenly items-center ">
                    <div className="w-[25%] h-[30px]">
                     <button className="w-[100%] h-full bg-green-950 font-semibold text-white text-sm rounded-sm">view</button>
                    </div>
                    <div className="w-[25%] h-[30px]  ">
                    <button className="w-[100%] h-full bg-green-800 font-semibold text-white text-sm rounded-sm">Edit</button>

                    </div>
                    <div className="w-[10%] h-[30px] rounded-md  flex justify-end items-end">
                    <MdDelete className="text-2xl text-center text-red-500" />
                    </div>
                    </div>

                </div>
                
                </div>
            </div>
            </>
           )))
           }


          </div>
        </div>
      </div>
    </>
  );
}

export default ModalForImageupload;
