import {createSlice} from '@reduxjs/toolkit'
import { loginUser, signUpUser } from './thunk/auth';

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
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.success = true
            state.message ="Logged In"
            state.userInfo = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
        }).addCase(loginUser.rejected,(state,action)=>{
            state.error = true
            state.errormessage = action.payload.error
            
        }).addCase(signUpUser.fulfilled,(state,action)=>{
            state.success = true
            state.message ="Sign-Up Success"
            state.userInfo = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))

        }).addCase(signUpUser.rejected,(state,action)=>{
            state.error = true
            state.errormessage = action.payload.error
        })
    }
})



export const { reset, resetSuccessAndMessage, resetErrorAndErrorMessage, urgentreset } = userSlice.actions;
export default userSlice.reducer;