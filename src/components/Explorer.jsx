import { useState } from 'react'
import { useGetRecipesQuery } from '../logic/spoonacular/apiSpoonAcularSlice'
import SearchBar from './SearchBar'
import { account, databases } from '../config/appWrite' // Ensure you import Appwrite SDK

const Explorer = () => {
    const [searchQuery, setSearchQuery] = useState('') // Default search query
    const { data, error, isLoading } = useGetRecipesQuery({
        number: 12, // Requesting 10 recipes
        query: searchQuery,
        addRecipeInformation: true, // Fetch additional information
    })

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    const addRecipeToMyRecipes = async (recipe) => {
        try {
            const userId = (await account.get()).$id // Get the current user's ID
            await databases.createDocument(
                '66bffdcb002683b1c240',
                '66bffddc000b0cc2fc13',
                'unique()',
                {
                    title: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    // Include any other fields you want to save
                    userId: userId, // Link to the user
                }
            )
            alert('Recipe added to your collection!')
        } catch (error) {
            console.error('Failed to add recipe:', error)
            alert('Failed to add recipe. Please try again.')
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    const recipes = data || []

    return (
        <div className="p-6 pb-24 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Recipe Explorer
            </h1>

            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 relative"
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {recipe.title}
                            </h2>
                            <p
                                className="text-gray-700 text-sm mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: recipe.summary,
                                }}
                            ></p>
                            <button
                                onClick={() => addRecipeToMyRecipes(recipe)}
                                className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Explorer
