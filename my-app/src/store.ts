// import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import mainDataReducer from "./slices/MainSlice.ts"
// import detailedDataReducer from './slices/DetailedSlices'
// import authDataReducer from "./slices/AuthSlices"
// import respDataReducer from './slices/RespSlices.ts'



// export default configureStore({
//     reducer: combineReducers({
//         mainData: mainDataReducer,
//         detailedData: detailedDataReducer,
//         authData: authDataReducer,
//         respData: respDataReducer
//     })
// })

import { configureStore } from "@reduxjs/toolkit";
import mainDataReducer from "./slices/MainSlice.ts";
import detailedDataReducer from './slices/DetailedSlices';
import authDataReducer from "./slices/AuthSlices";
import respDataReducer from './slices/RespSlices.ts';

const store = configureStore({
    reducer: {
        mainData: mainDataReducer,
        detailedData: detailedDataReducer,
        authData: authDataReducer,
        respData: respDataReducer
    },
    devTools: process.env.NODE_ENV !== 'production', // Включить DevTools только в режиме разработки
});

export default store;
