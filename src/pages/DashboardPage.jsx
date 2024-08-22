import { useState, useEffect } from 'react'
import MyRecipes from '../components/MyRecipes'
import RecipeForm from '../components/RecipeForm'
import Main from '../containers/Main'
import { databases } from '../config/appWrite'

const DashboardPage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [recipes, setRecipes] = useState([])

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible)
    }

    // Fetch recipes in DashboardPage and pass them down
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await databases.listDocuments(
                    '66bffdcb002683b1c240',
                    '66bffddc000b0cc2fc13'
                )
                // Initialize servings state for each recipe
                const recipesWithServings = response.documents.map(
                    (recipe) => ({
                        ...recipe,
                        servings: 1, // default serving size is 1
                    })
                )
                setRecipes(recipesWithServings)
            } catch (error) {
                console.error('Failed to fetch recipes:', error)
            }
        }

        fetchRecipes()
    }, [])

    return (
        <Main>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={toggleFormVisibility}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                >
                    {isFormVisible ? 'Hide Recipe Form' : 'Add Recipe'}
                </button>
            </div>
            {isFormVisible && (
                <div className="mb-6 transition-all duration-300">
                    <RecipeForm setRecipes={setRecipes} recipes={recipes} />
                </div>
            )}
            <MyRecipes recipes={recipes} setRecipes={setRecipes} />
        </Main>
    )
}

export default DashboardPage
