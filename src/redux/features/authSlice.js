import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login Sucessfully ");
      navigate("/");
      return response.data;
    } catch (error) {
      // console.log("error", error);
      // toast.error(error.response.data.massage);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log("form value redux ", formValue);
      const response = await api.signUp(formValue);
      toast.success("Register Sucessfully ");
      navigate("/");
      return response.data;
    } catch (error) {
      // console.log("error", error);
      // toast.error(error.response.data.massage);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      console.log("rejected", state);
      state.loading = false;
      state.error = action.payload.massage;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      console.log("rejected", state);
      state.loading = false;
      state.error = action.payload.massage;
    },
  },
});

export default authSlice.reducer;
