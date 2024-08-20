import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserRecipes } from '../logic/recipes/recipesSlice'

const MyRecipes = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const recipes = useSelector((state) => state.recipes.userRecipes)
    const status = useSelector((state) => state.recipes.status)

    useEffect(() => {
        if (user) {
            dispatch(fetchUserRecipes(user.$id))
        }
    }, [user, dispatch])

    if (status === 'loading') return <div>Loading...</div>
    if (status === 'failed') return <div>Error loading recipes.</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li
                        key={recipe.$id}
                        className="p-4 bg-white shadow-md rounded"
                    >
                        <h2 className="text-xl font-semibold">
                            {recipe.title}
                        </h2>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="mt-2 mb-2 w-32 h-32 object-cover"
                        />
                        <p className="text-gray-700">{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MyRecipes
