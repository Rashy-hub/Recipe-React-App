// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const spoonacularApiKey = 'b8d7630a6dac4952afe23934ed8b0b59'
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spoonacular.com',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Recipes'],
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (queryParams) => ({
                url: `/recipes/complexSearch`,
                method: 'GET',
                params: {
                    ...queryParams,
                    apiKey: spoonacularApiKey,
                },
            }),
            transformResponse: (response) => response.results || [],
            providesTags: ['Recipes'],
        }),
        getRecipeById: builder.query({
            query: (id) => ({
                url: `/recipes/${id}/information`,
                params: { apiKey: spoonacularApiKey },
            }),
            providesTags: (result, error, id) => [{ type: 'Recipes', id }],
        }),
    }),
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = apiSlice
