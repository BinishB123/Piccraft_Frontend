import { image } from "../api/api"
import { axiosInstance } from "../api/axios.jsx"

export const addImagesServices = (data)=>{
  
  return new Promise((resolve, reject) => {
    axiosInstance.post(image.addImages,data,{
        headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
        }
    }).then((response)=>{
      console.log(response);
      
        resolve(response)
    }).catch((error)=>{
        reject(error)
    })
  })
}

export const getLatestImages = (id)=>{
  return new Promise((resolve,reject)=>{
    axiosInstance.get(image.getlatestImages+`/${id}`).then((response)=>{
      resolve(response)
    }).catch((error)=>{
      reject(error.response.data)
    })
  })
}

export const deleteAnImage = (id,userid)=>{
  return new Promise((resolve,reject)=>{
    axiosInstance.delete(image.deleteAnImage+`/${id}/${userid}`).then((response)=>{
      resolve(response)
    }).catch((error)=>{
      reject(error.response.data)
    })
  })
}


export const changeTittleService = (id,newName)=>{
  return new Promise((resolve,reject)=>{
    axiosInstance.patch(image.changename,{id,newName}).then((response)=>{
      resolve(response)
    }).catch((error)=>{
      reject(error.response.data)
    })
  })

} 