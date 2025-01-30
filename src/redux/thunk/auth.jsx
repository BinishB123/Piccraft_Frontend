import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, signup } from "../../service/auth";


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await loginService(userData.email, userData.password);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error || "Login failed");
      }
    }
  );


  export const signUpUser = createAsyncThunk('auth/signUser',async(userData,{rejectWithValue})=>{
    try {
        const response = await signup(userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error||"signup Failed")
    }
  })