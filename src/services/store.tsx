

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import studentReducer from "./studentReducer";
import adminReducer from "./adminReducer";


const rootReducer = combineReducers({
    auth : userReducer,
    authStudent: studentReducer,
    authAdmin: adminReducer
})


const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)


//serialiazable checks

const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER ]
        }
    }),
    devTools: true
})

export const persistor = persistStore(store)


export default store;