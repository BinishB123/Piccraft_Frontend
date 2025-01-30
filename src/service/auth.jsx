import { auth } from "../api/api"
import { axiosInstance } from "../api/axios"

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