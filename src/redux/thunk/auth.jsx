import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../service/auth";


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