import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../app/store'

export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        isAuthenticated: false
    },

    reducers: {
        setAuthState: (state, { payload }: PayloadAction<boolean>): void => {
            state.isAuthenticated = payload
        }
    }
})

export const { setAuthState } = authSlice.actions

export const isAuthenticated = (state: RootState ) => state.auth.isAuthenticated

export const authReducer = authSlice.reducer