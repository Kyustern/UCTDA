import { configureStore } from '@reduxjs/toolkit'
import { todosReducer } from '../features/todoSlice'
import { authReducer } from '../features/authSlice'

// const loggerMiddleware = store => next => action => {
//     console.log("Action triggered : ", action);
//     next(action)
// }

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        auth: authReducer
    },
    // middleware:[loggerMiddleware],
    devTools: process.env.NODE_ENV !== "development" ? false : true
})


export type RootState = ReturnType<typeof store.getState>;