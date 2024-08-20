import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases } from '../../config/appWrite';
//https://api.spoonacular.com/recipes/complexSearch?number=10&query=pasta&apiKey=b8d7630a6dac4952afe23934ed8b0b59
// Fetch saved recipes for the user
export const fetchUserRecipes = createAsyncThunk('recipes/fetchUserRecipes', async (userId) => {
    const response = await databases.listDocuments('<your-database-id>', '<your-collection-id>', [
        {
            key: 'userId',
            value: userId,
        },
    ]);
    return response.documents;
});

// Save a new recipe for the user
export const saveRecipe = createAsyncThunk('recipes/saveRecipe', async ({ userId, recipe }) => {
    const response = await databases.createDocument('<your-database-id>', '<your-collection-id>', 'unique()', {
        userId,
        ...recipe,
    });
    return response;
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        userRecipes: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserRecipes.fulfilled, (state, action) => {
                state.userRecipes = action.payload;
                state.status = 'succeeded';
            })
            .addCase(saveRecipe.fulfilled, (state, action) => {
                state.userRecipes.push(action.payload);
            })
            .addCase(fetchUserRecipes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default recipeSlice.reducer;
