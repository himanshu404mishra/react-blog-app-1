import { configureStore } from "@reduxjs/toolkit";
import AuthReducres from "../redux/slices/AuthSlice"

const store = configureStore({
    reducer:AuthReducres,
})

export default store