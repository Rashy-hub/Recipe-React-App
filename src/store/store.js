// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../logic/authAppWrite/authSlice'
import recipeReducer from '../logic/recipes/recipesSlice'
import { apiSlice } from '../logic/spoonacular/apiSpoonAcularSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer, // Add apiSlice here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // Add apiSlice middleware
})
