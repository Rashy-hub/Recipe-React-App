// src/components/RecipeList.jsx
import { useGetRecipesQuery } from '../features/api/apiSlice';

const RecipeList = () => {
  const { data: recipes = [], error, isLoading } = useGetRecipesQuery({
    number: 10, // Limite à 10 recettes
    query: 'dessert', // Exemple de requête
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-semibold">{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
