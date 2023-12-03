import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainDataReducer from "./slices/MainSlice.ts"
import detailedDataReducer from './slices/DetailedSlices'
import authDataReducer from "./slices/AuthSlices"
import respDataReducer from './slices/RespSlices.ts'



export default configureStore({
    reducer: combineReducers({
        mainData: mainDataReducer,
        detailedData: detailedDataReducer,
        authData: authDataReducer,
        respData: respDataReducer
    })
})