import { auth } from "../api/api"
import { axiosInstance } from "../api/axios.jsx"

export const signup = (bodydata) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance.post(auth.signup, bodydata).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error.response.data)
            })
        } catch (error) {
            reject(error.response.data)

        }

    })
}

export const loginService = (email,password)=>{
    return new Promise((resolve, reject) => {
        try {
            axiosInstance.post(auth.login,{email,password} ).then((response) => {
                resolve(response)
            }).catch((error) => {
                
                
                reject(error.response.data)
            })
        } catch (error) {
            reject(error.response.data)

        }
    })
}


export const logOut = ()=>{
    return new Promise((resolve, reject) => {
        try {
            axiosInstance.delete(auth.logout).then((response) => {
                resolve(response)
            }).catch((error) => {
                
                
                reject(error.response.data)
            })
        } catch (error) {
            reject(error.response.data)

        }
    })
}


