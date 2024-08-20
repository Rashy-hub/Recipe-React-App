// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { account } from '../../config/appWrite';

// Async thunk for checking current session
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (error) {
        console.log(error)
        return null;
    }
});

// Async thunk for logging in the user
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const session = await account.createEmailSession(email, password);
    return session;
});

// Async thunk for registering a new user
export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password, name }) => {
    const user = await account.create('unique()', email, password, name);
    return user;
});

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await account.deleteSession('current');
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        session: null,
        status: 'idle',
        isCheckingAuth: true,
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.session = action.payload;
                state.user = action.payload?.user || null;
                state.status = 'succeeded';
                state.isCheckingAuth = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.session = action.payload;
                state.status = 'succeeded';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.session = null;
                state.status = 'idle';
            })
            .addCase(checkAuth.rejected, (state) => {
                state.status = 'failed';
                state.isCheckingAuth = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
