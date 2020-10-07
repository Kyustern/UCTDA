import { configureStore } from '@reduxjs/toolkit'
import { type } from 'os';
import todosReducer from '../features/todoSlice'

// const loggerMiddleware = store => next => action => {
//     console.log("Action triggered : ", action);
//     next(action)
// }

export const store = configureStore({
    reducer: {
        todos: todosReducer
    },
    // middleware:[loggerMiddleware],
    devTools: process.env.NODE_ENV !== "development" ? false : true
})


export type RootState = ReturnType<typeof store.getState>;