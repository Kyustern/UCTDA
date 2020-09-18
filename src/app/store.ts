import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todoSlice'

export const store = configureStore({
    reducer: {
        todos: todosReducer
    },
    devTools: process.env.NODE_ENV !== "development" ? false : true
})

export type RootState = ReturnType<typeof store.getState>;