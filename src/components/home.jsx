import { IoIosCloudUpload } from "react-icons/io";
import { useAppContext } from "../context/common";

function Home() {
    const {setImageModal} = useAppContext()
  return (
    <>
      <div className="w-[100%] h-[682px]  flex flex-col justify-between items-center">
        <div className="w-[80%] h-[50px] bg-green-200 mt-4 rounded-md flex justify-end">
            <div className="w-[15%] h-full flex justify-center items-center space-x-1 cursor-pointer " onClick={()=>{
                setImageModal(true)
            }}>
            <IoIosCloudUpload className="text-2xl" />
            <h1 className="font-semibold text-md text-green-950">upload</h1>
            </div>


        </div>
        <div className="w-[80%] h-[600px]  flex flex-col  ">
            <div className="w-[100%] h-[550px] grid grid-cols-4  items-center gap-3  space-x-1">
                {[1,2,3,4,5,6,7,8].map((data,index)=>(
                    <>
                    <div className="w-[100%] h-[250px] rounded-sm shadow-sm shadow-green-200 cursor-pointer">

                    </div>
                    </>
                ))}

            </div>
            <div className="w-[100%] h-[40px] cursor-pointer">

            </div>  

        </div>
        

      </div>
    </>
  );
}

export default Home;
