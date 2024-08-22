//import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { databases } from '../config/appWrite'

const MyRecipes = ({ recipes, setRecipes }) => {
    const deleteRecipe = async (recipeId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this recipe?'
        )

        if (confirmed) {
            try {
                await databases.deleteDocument(
                    '66bffdcb002683b1c240',
                    '66bffddc000b0cc2fc13',
                    recipeId
                )
                setRecipes(recipes.filter((recipe) => recipe.$id !== recipeId))
                alert('Recipe deleted successfully!')
            } catch (error) {
                console.error('Failed to delete recipe:', error)
                alert('Failed to delete recipe. Please try again.')
            }
        }
    }

    const adjustServings = (recipeId, action) => {
        setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) => {
                if (recipe.$id === recipeId) {
                    const newServings =
                        action === 'increment'
                            ? Math.min(recipe.servings + 1, 4) // limit max servings to 4
                            : Math.max(recipe.servings - 1, 1) // limit min servings to 1

                    return {
                        ...recipe,
                        servings: newServings,
                    }
                }
                return recipe
            })
        )
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 font-inter">
                Recipe Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 font-inter">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.$id}
                        className="bg-white rounded-lg shadow-lg p-4 relative"
                    >
                        <img
                            src={recipe.cover_image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover rounded-t-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">
                            {recipe.title}
                        </h3>
                        <p className="text-gray-700 mb-4">
                            {recipe.description}
                        </p>

                        {/* Servings Adjustment */}
                        <div className="flex items-center mb-4">
                            <button
                                onClick={() =>
                                    adjustServings(recipe.$id, 'decrement')
                                }
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                                disabled={recipe.servings === 1}
                            >
                                -
                            </button>
                            <span className="mx-4 text-lg font-semibold">
                                {recipe.servings} Servings
                            </span>
                            <button
                                onClick={() =>
                                    adjustServings(recipe.$id, 'increment')
                                }
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                                disabled={recipe.servings === 4}
                            >
                                +
                            </button>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">
                            Ingredients:
                        </h4>
                        <ul className="list-disc list-inside">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <strong>
                                        {(
                                            Number(ingredient.qty) *
                                            recipe.servings
                                        ).toFixed(2)}
                                    </strong>{' '}
                                    {ingredient.unit} of {ingredient.name}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => deleteRecipe(recipe.$id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                            aria-label="Delete Recipe"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 00-2 2h12a2 2 0 00-2-2M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

MyRecipes.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            $id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            ingredients: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    qty: PropTypes.number.isRequired,
                    unit: PropTypes.string.isRequired,
                })
            ).isRequired,
            servings: PropTypes.number.isRequired,
        })
    ).isRequired,
    setRecipes: PropTypes.func.isRequired,
}

export default MyRecipes
