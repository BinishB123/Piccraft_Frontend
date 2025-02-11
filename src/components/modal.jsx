import { useRef, useState } from "react";
import { useAppContext } from "../context/common";
import { IoIosCloudUpload } from "react-icons/io";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { addImagesServices } from "../service/image";
import { FaPenToSquare } from "react-icons/fa6";
import Cropper from "react-easy-crop";
import { FaCircleNodes } from "react-icons/fa6";

function ModalForImageupload() {
  const { setImageModal, userInfo , setHomeImages} = useAppContext();
  const [uploading,setUploading] = useState(false)
  const [images, setImages] = useState([]);
  const [tittle, setTittle] = useState("");
  const [croppedData, setCroppedData] = useState(null);
  const [editTittle, setEditTittle] = useState(false);
  const [imageEdit, setImageEdit] = useState({
    view: false,
    image: {},
    postion: null,
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [orginalFiles, setFiles] = useState([]);
  const [viewImage, setViewImage] = useState({ view: false, image: "" });
  const imageInputRef = useRef();

  const addImages = (files) => {
    const updatedimages = [];
    const orgImage = [];
    const imageTypes = ["image/jpeg", "image/png"];

    for (let index = 0; index < files.length; index++) {
      if (!imageTypes.includes(files[index].type)) {
        continue;
      }

      const img = new Image();
      img.src = URL.createObjectURL(files[index]);

      img.onload = () => {
        const originalDimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight,
        };

        orgImage.push({
          file: files[index],
          title: null,
          crop: null,
          originalDimensions,
        });
        updatedimages.push({
          file: img.src,
          title: null,
          crop: null,
          originalDimensions,
        });

        setFiles([...orgImage]);
        setImages([...updatedimages]);
      };
    }
  };

  const OnClicktoAddImage = () => {
    const data = new FormData();
    data.append("id", userInfo.id);
    orginalFiles.forEach((image) => {
      data.append("images", image.file);
      data.append(
        "imageData",
        JSON.stringify({
          crop: image.crop,
          isCropped: image.isCropped,
          title: image.tittle,
        })
      );
    });
    setUploading(true)
    addImagesServices(data).then((response)=>{
      console.log("thyr",response.data.images);
      
      setHomeImages(response.data.images)
      setImageModal(false)
      setUploading(false)
    });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    if (croppedAreaPixels) {
      setCroppedData({
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      });
    }
  };

  const changeTittle = () => {
    const updatedData = images.map((data, index) => {
      if (index === imageEdit.postion) {
        return { ...data, tittle: tittle };
      }
      return data;
    });

    setImageEdit((prev) => ({
      ...prev,
      image: updatedData[imageEdit.postion],
    }));
    setEditTittle(false);
  };

  const done = () => {
    const updatedData = images.map((data, index) => {
      if (index === imageEdit.postion) {
        const isCropped =
          croppedData &&
          (croppedData.width !== data.originalDimensions.width ||
            croppedData.height !== data.originalDimensions.height ||
            croppedData.x !== 0 ||
            croppedData.y !== 0);

        return { ...data, crop: croppedData, tittle: tittle, isCropped };
      }
      return data;
    });
    const updatedDataOrg = orginalFiles.map((data, index) => {
      if (index === imageEdit.postion) {
        const isCropped =
          croppedData &&
          (croppedData.width !== data.originalDimensions.width ||
            croppedData.height !== data.originalDimensions.height ||
            croppedData.x !== 0 ||
            croppedData.y !== 0);

        return { ...data, crop: croppedData, tittle: tittle, isCropped };
      }
      return data;
    });

    setImages(updatedData);
    setFiles(updatedDataOrg);
    setImageEdit((prev) => ({ ...prev, view: false }));
  };


  const deleteImage = (indextodelete)=>{
    const filterimages = images.filter((data,index)=>{
      if(index!==indextodelete){
        return data
      }
    })
    const filteredOrgImag= orginalFiles.filter((data,index)=>{
      if (index!==indextodelete){
        return data
      }
    })
    setImages(filterimages)
    setFiles(filteredOrgImag)

  }

  return (
    <>
      <div className="fixed inset-0 bg-green-900/40 backdrop-blur flex items-center justify-center transition-opacity">
        <div className="w-[100%] h-[720px] flex flex-col justify-center items-center">
          <div className="w-[80%] h-[30px]  flex justify-end cursor-pointer">
            <div
              className="w-[5%] h-full bg-green-950 text-center rounded-t-md text-white font-semibold text-xl"
              onClick={() => setImageModal(false)}
            >
              <h1>X</h1>
            </div>
          </div>
          <div
            className={`w-[80%] h-[550px] bg-white rounded-sm border-2 border-green-200 ${
              images.length < 1
                ? "flex flex-col justify-center items-center"
                : "flex flex-wrap justify-center space-x-2 space-y-3  items-center overflow-y-scroll "
            }`}
          >
            {images.length < 1 ? (
              <div
                className=" bg-green-100 w-[80%] cursor-pointer h-[400px] flex flex-col justify-center items-center outline-dotted outline-green-500 text-center"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <h1 className=" text-green-800 text-lg font-semibold">
                  Click To Add Your Images
                </h1>
                <IoIosCloudUpload className="text-4xl" />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={imageInputRef}
                  onChange={(e) => {
                    addImages(e.target.files);
                  }}
                />
              </div>
            ) : (
              images.map((data, index) => (
                <>
                  <div className="w-[30%] h-[250px] bg-red-400 flex flex-col items-center shadow-md">
                    <div
                      className="relative w-full h-[250px] bg-cover bg-center flex flex-col items-end  justify-end    overflow-hidden  bg-white "
                      style={{ backgroundImage: `url(${data.file})` }}
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
                                setViewImage({ view: true, image: data.file });
                              }}
                            >
                              view
                            </button>
                          </div>
                          <div className="w-[25%] h-[30px]">
                            <button
                              className="w-[100%] h-full bg-green-800 font-semibold text-white text-sm rounded-sm"
                              onClick={() => {
                                setImageEdit({
                                  view: true,
                                  image: data,
                                  postion: index,
                                });
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <div className="w-[10%] h-[30px] rounded-md  flex justify-end items-end">
                            <MdDelete className="text-2xl text-center text-red-500" onClick={()=>deleteImage(index)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
          <div
            className={`${
              images.length > 0
                ? "h-[50px] cursor-pointer w-[80%] bg-green-950 flex justify-center items-center rounded-md"
                : "hidden"
            }`}
            onClick={() => {
              OnClicktoAddImage();
            }}
          >
            <h1 className="text-md text-center text-white font-bold">
              Add Images
            </h1>
          </div>
        </div>
      </div>
      {viewImage.view && (
        <div className="fixed inset-0 bg-green-900/40 backdrop-blur flex items-center justify-center transition-opacity">
          <div className="h-full w-full flex flex-col justify-center items-center ">
            <div className="w-[40%] h-[50px]  flex justify-end">
              <div
                className="w-[10%] h-full rounded-t-md flex justify-center items-center bg-green-950 cursor-pointer "
                onClick={() => setViewImage(false)}
              >
                <h1 className="text-white text-3xl">X</h1>
              </div>
            </div>
            <div className="w-[40%] h-[600px] bg-transparent rounded-l-sm flex justify-center items-center  rounded-b-sm">
              <img
                src={viewImage.image}
                alt=""
                className="w-full h-full object-scale-down"
              />
            </div>
          </div>
        </div>
      )}
      {imageEdit.view && (
        <div className="fixed inset-0 bg-green-900/40 backdrop-blur flex items-center justify-center transition-opacity">
          <div className="h-full w-full flex flex-col justify-center items-center ">
            <div className="w-[40%] h-[600px] overflow-hidden rounded-l-sm flex justify-center items-center rounded-b-sm relative">
              <Cropper
                image={imageEdit.image.file}
                crop={crop}
                zoom={zoom}
                aspect={14.4 / 18}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{ position: "absolute", width: "100%", height: "100%" }} // Ensure full coverage
              />
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
                      onClick={changeTittle}
                    />
                  </>
                ) : (
                  <>
                    <h1 className="w-[90%] text-white font-semibold">
                      {imageEdit.image.tittle
                        ? imageEdit.image.tittle
                        : "No tittle"}
                    </h1>
                    <FaPenToSquare
                      className="  text-white "
                      onClick={() => {
                        setEditTittle(true);
                        setTittle(
                          imageEdit.image.tittle ? imageEdit.image.tittle : ""
                        );
                      }}
                    />
                  </>
                )}
              </div>
              <div className="w-full h-[40px] flex justify-between">
                <button
                  className="w-[40%] h-full text-white font-semibold rounded-md cursor-pointer bg-green-500"
                  onClick={done}
                >
                  Done
                </button>
                <button
                  className="w-[40%] h-full text-white font-semibold rounded-md cursor-pointer bg-red-600"
                  onClick={() => {
                    setImageEdit({ view: false, image: "", postion: null });
                    setEditTittle(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        uploading&&(<>
         <div className="fixed inset-0 bg-green-900/10 backdrop-blur flex items-center justify-center transition-opacity">
         <FaCircleNodes className="text-green-950 text-2xl animate-spin " />
         <h1 className="text-sm font-semibold text-green-950 animate-pulse">please wait your image is uploading...</h1>

        </div>
        </>)
      }
    </>
  );
}

export default ModalForImageupload;
