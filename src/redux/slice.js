import {createSlice} from '@reduxjs/toolkit'

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;


const initialState= {
    userInfo: user ? user : null,
    success: null,
    isLoggedIn: user ? true : false,
    isLoading: false,
    errormessage: "",
    error: false,
    message: ''

};


const userSlice =  createSlice({
    name:"user",
    initialState,
    reducers:{
        reset:(state)=>{
            state.userInfo =   null,
            state.success = null,
            state.isLoggedIn=  false,
            state.isLoading= false,
            state.errormessage= "",
            state.error= false,
            state.message= ''
        },
        resetSuccessAndMessage: (state) => {
            state.message = ""
            state.success = null
        },
        resetErrorAndErrorMessage: (state) => {
            state.error = false
            state.errormessage = ""
        },
        urgentreset: (state) => {
            state.message = ""
            state.success = null
            state.error = false;
            state.errormessage = ""
        },
    }
})



export const { reset, resetSuccessAndMessage, resetErrorAndErrorMessage, urgentreset } = userSlice.actions;
export default userSlice.reducer;