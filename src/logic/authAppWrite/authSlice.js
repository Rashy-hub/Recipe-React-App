// src/logic/authAppWrite/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { account } from '../../config/appWrite'

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const session = await account.getSession('current')
            return session
        } catch (error) {
            if (error.code === 401) {
                return rejectWithValue('User not authenticated')
            }
            return rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const session = await account.createEmailPasswordSession(
                email,
                password
            )
            return session
        } catch (error) {
            throw new Error('Failed to login: ' + error.message)
        }
    }
)
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, name }) => {
        try {
            const user = await account.create('unique()', email, password, name)
            return user
        } catch (error) {
            throw new Error('Failed to register: ' + error.message)
        }
    }
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    try {
        await account.deleteSession('current')
    } catch (error) {
        throw new Error('Failed to logout: ' + error.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        session: null,
        status: 'idle',
        isCheckingAuth: true,
        sessionIsActive: null,
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        clearUser(state) {
            state.user = null
            state.session = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true
                state.sessionIsActive = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.session = action.payload
                state.user = action.payload?.user || null
                state.status = 'succeeded'
                state.isCheckingAuth = false
                state.sessionIsActive = true
            })
            .addCase(checkAuth.rejected, (state) => {
                state.status = 'failed'
                state.isCheckingAuth = false
                state.sessionIsActive = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.session = action.payload
                state.user = action.payload?.user || null
                state.status = 'succeeded'
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'succeeded'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.session = null
                state.status = 'idle'
                state.sessionIsActive = false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
