// src/components/RecipeForm.js
import  { useState } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';
import { createRecipe } from '../services/recipeService';

const RecipeForm = ({ onRecipeCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverPicture, setCoverPicture] = useState(null);
    const [ingredients, setIngredients] = useState([{ name: '', quantity: 0 }]);
    const [people, setPeople] = useState(1);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: 0 }]);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipeData = {
            title,
            description,
            coverPicture,
            ingredients: ingredients.map(ingredient => ({
                name: ingredient.name,
                quantity: ingredient.quantity / people
            }))
        };
        await createRecipe(recipeData);
        onRecipeCreated();
    };

    return (
        <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Create a New Recipe</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Cover Picture:</label>
                <input
                    type="file"
                    className="block w-full text-sm text-gray-500"
                    onChange={(e) => setCoverPicture(e.target.files[0])}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Number of People:</label>
                <input
                    type="number"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    min="1"
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            {ingredients.map((ingredient, index) => (
                <Ingredient
                    key={index}
                    index={index}
                    ingredient={ingredient}
                    onChange={(field, value) => handleIngredientChange(index, field, value)}
                />
            ))}
            <button
                type="button"
                onClick={handleAddIngredient}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Ingredient
            </button>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit Recipe
            </button>
        </form>
    );
};

RecipeForm.propTypes = {
    onRecipeCreated: PropTypes.func.isRequired
};

export default RecipeForm;
