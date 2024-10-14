// src/services/recipeService.js

import { databases } from '../appwrite/config'

const DATABASE_ID = '66bffdcb002683b1c240'
const COLLECTION_ID = '66bffddc000b0cc2fc13'

export const getRecipes = async () => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID
        )
        return response.documents
    } catch (error) {
        console.error('Error fetching recipes:', error)
        return []
    }
}

export const createRecipe = async (recipeData) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            'unique()',
            recipeData
        )
        return response
    } catch (error) {
        console.error('Error creating recipe:', error)
    }
}
