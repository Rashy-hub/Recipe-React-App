import { useGetRecipesQuery } from '../logic/spoonacular/apiSpoonAcularSlice'

const Dashboard = () => {
    const { data, error, isLoading } = useGetRecipesQuery({
        number: 10, // Requesting 10 recipes
        query: 'chicken', // Example search query
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    const recipes = data || []

    return (
        <div className="p-4 pb-24">
            <h1 className="text-2xl font-bold mb-4">Recipe Explorer</h1>
            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li
                        key={recipe.id}
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
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard
