import { IoIosCloudUpload } from "react-icons/io";
import { useAppContext } from "../context/common";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import {
  changeTittleService,
  deleteAnImage,
  getLatestImages,
} from "../service/image";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";

function Home() {
  const { setImageModal, homesImages, setHomeImages, userInfo, clear } =
    useAppContext();
  const [view, setView] = useState(false);
  const [tittle, setTittle] = useState("");
  const [totalData,setTotalData ] = useState(0)
  const [imageEdit, setImageEdit] = useState(false);
  const [imageEditData, setEditImageData] = useState(null);
  const [editTittle, setEditTittle] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    getLatestImages(userInfo.id)
      .then((response) => {
        setTotalData(response.data.count)
        setHomeImages(response.data.images);
      })
      .catch((error) => {
        clear(error);
      });
  }, []);

  const changeTittle = (id) => {
    changeTittleService(id, tittle).then((response) => {
      setEditImageData((prev) => ({
        ...prev,
        tittle: tittle,
      }));
      const updatedData = homesImages.map((data) => {
        if (data._id === id) {
          return { ...data, tittle: tittle };
        }
        return data;
      });
      console.log(updatedData);

      setHomeImages(updatedData);
      setEditTittle(false);
    });
  };

  const deleteImg = (id) => {
    deleteAnImage(id, userInfo.id).then((response) => {
      setHomeImages(response.data);
    });
  };

  const handleDragEnd = (result) => {
   
    if (!result.destination) return;
    const items = Array.from(homesImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setHomeImages(items);
  };
  

  return (
    <>
      <div className="w-[100%] h-[682px]  flex flex-col justify-between items-center">
        <div className="w-[80%] h-[50px] bg-green-200 mt-4 rounded-md flex justify-end">
          <div
            className="w-[15%] h-full flex justify-center items-center space-x-1 cursor-pointer "
            onClick={() => {
              setImageModal(true);
            }}
          >
            <IoIosCloudUpload className="text-2xl" />
            <h1 className="font-semibold text-md text-green-950">upload</h1>
          </div>
        </div>  
        <div className="w-[80%] h-[600px]  flex flex-col  ">
          <DragDropContext onDragEnd={handleDragEnd}>
           <Droppable droppableId="yoooo">
          {(provided)=>(
            <div className="w-[100%] h-[550px] grid grid-cols-4  items-center gap-3  space-x-1" {...provided.droppableProps} ref={provided.innerRef}>
           {homesImages.map((data, index) => (
            <>
          <Draggable key={data._id} draggableId={data._id} index={index}>

              {(provided)=>(
                 <div className="w-[100%] h-[250px] rounded-sm shadow-sm shadow-green-200 cursor-pointer" {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}>
                 <div
                   className="relative w-full h-[250px] bg-cover bg-center flex flex-col items-end  justify-end    overflow-hidden  bg-white "
                   style={{ backgroundImage: `url(${data.url})` }}
                 >
                   {/* <img src={data} key={index} alt="" className="  object-cover"  /> */}

                   <div className="h-[80px] w-[100%]  cursor-pointer  bg-gradient-to-t from-black  flex flex-col justify-evenly items-center">
                     <div>
                       <h1 className="text-white">
                         {data.tittle ? data.tittle : "No Tittle Name"}
                       </h1>
                     </div>
                     <div className="w-[100%] h-[30px] flex justify-evenly items-center ">
                       <div className="w-[25%] h-[30px]">
                         <button
                           className="w-[100%] h-full bg-green-950 font-semibold text-white text-sm rounded-sm"
                           onClick={() => {
                             setView(true);
                             setImageUrl(data.url);
                             // setViewImage({ view: true, image: data.file });
                           }}
                         >
                           view
                         </button>
                       </div>
                       <div className="w-[25%] h-[30px]">
                         <button
                           className="w-[100%] h-full bg-green-800 font-semibold text-white text-sm rounded-sm"
                           onClick={() => {
                             setImageEdit(true);
                             setTittle(data.tittle);
                             setEditImageData(data);
                           }}
                         >
                           Edit
                         </button>
                       </div>
                       <div className="w-[10%] h-[30px] rounded-md  flex justify-end items-end">
                         <MdDelete
                           className="text-2xl text-center text-red-500"
                           onClick={() => {
                             deleteImg(data._id);
                           }}
                         />
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               )}
              </Draggable>
              </>
            ))}
          </div>
          )}
          </Droppable>
          </DragDropContext>
          <div className="w-[100%] h-[40px] cursor-pointer flex justify-center space-x-3">
            {totalData&&(<><div className="bg-green-800 place-content-center rounded-full place-items-center w-[3%] h-full">
            <h1 className="text-2xl text-white font-bold">{"<"}</h1>
            </div>
            <div className="border-2 rounded-full border-green-500 place-content-center place-items-center w-[3%] h-full">
              <h1 className="text-sm font-semibold text-green-500">1</h1>
            </div>
            <div className="bg-green-800 place-content-center rounded-full place-items-center w-[3%] h-full">
            <h1 className="text-2xl text-white font-bold ">{">"}</h1>
            </div></>)}

          </div>
        </div>
      </div>
      {view && (
        <div className="fixed inset-0 bg-green-900/50 backdrop-blur flex items-center justify-center transition-opacity">
          <div className="h-full w-full flex flex-col justify-center items-center ">
            <div className="w-[40%] h-[50px]  flex justify-end">
              <div
                className="w-[10%] h-full rounded-t-md flex justify-center items-center bg-green-950 cursor-pointer "
                onClick={() => setView(false)}
              >
                <h1 className="text-white text-3xl">X</h1>
              </div>
            </div>
            <div className="w-[40%] h-[600px] bg-transparent rounded-l-sm flex justify-center items-center  rounded-b-sm">
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-scale-down"
              />
            </div>
          </div>
        </div>
      )}
      {imageEdit && (
        <div className="fixed inset-0 bg-green-900/40 backdrop-blur flex items-center justify-center transition-opacity">
          <div className="h-full w-full flex flex-col justify-center items-center ">
            <div className="w-[40%] h-[600px] overflow-hidden rounded-l-sm flex justify-center items-center rounded-b-sm relative">
              <div className="w-full h-full bg-transparent rounded-l-sm flex justify-center items-center  rounded-b-sm">
                <img
                  src={imageEditData.url}
                  alt=""
                  className="w-full h-full object-scale-down"
                />
              </div>
            </div>
            <div className="w-[40%] h-[100px] flex flex-col space-y-1 ">
              <div className="w-[100%] h-[40px]  flex justify-end items-center space-x-8">
                {editTittle ? (
                  <>
                    <input
                      type="text"
                      className="rounded-md bg-white w-[90%] h-[37px] text-md font-semibold outline-none"
                      value={tittle}
                      onChange={(e) => setTittle(e.target.value)}
                    />
                    <IoCheckmarkDoneCircle
                      className="text-3xl text-green-700 rounded-full bg-white  "
                      onClick={() => {
                        changeTittle(imageEditData._id);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1 className="w-[90%] text-white font-semibold">
                      {imageEditData.tittle !== "Untitled"
                        ? imageEditData.tittle
                        : "No tittle"}
                    </h1>
                    <FaPenToSquare
                      className="  text-white "
                      onClick={() => {
                        setEditTittle(true);
                      }}
                    />
                  </>
                )}
              </div>
              <div className="w-full h-[40px] flex justify-between">
                <button
                  className="w-[40%] h-full text-white font-semibold rounded-md cursor-pointer bg-green-500"
                  onClick={() => {
                    setImageEdit(false);
                  }}
                >
                  Done
                </button>
                <button
                  className="w-[40%] h-full text-white font-semibold rounded-md cursor-pointer bg-red-600"
                  onClick={() => {
                    setImageEdit(false);
                    // setImageEdit({ view: false, image: "", postion: null });
                    // setEditTittle(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
