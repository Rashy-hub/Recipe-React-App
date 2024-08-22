import { useState } from 'react'
import { databases, storage, account } from '../config/appWrite'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

const RecipeForm = ({ setRecipes, recipes }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverImage, setCoverImage] = useState(null)
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: '', unit: '' },
    ])
    const [servings, setServings] = useState(1)

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients]
        newIngredients[index][field] = value
        setIngredients(newIngredients)
    }

    const addIngredientField = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }])
    }

    const removeIngredientField = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index)
        setIngredients(newIngredients)
    }

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0])
    }

    const uploadCoverImage = async () => {
        if (!coverImage) return null

        const fileId = uuidv4()
        const file = await storage.createFile(
            '66c64f5400316054e9e5',
            fileId,
            coverImage
        )
        return file.$id
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const coverImageId = await uploadCoverImage()
            const cover_image = coverImageId
                ? storage.getFileView('66c64f5400316054e9e5', coverImageId)
                : null

            const userId = (await account.get()).$id

            const ingredientIds = await Promise.all(
                ingredients.map(async (ingredient) => {
                    if (
                        !ingredient.name ||
                        !ingredient.quantity ||
                        !ingredient.unit
                    ) {
                        throw new Error("Données d'ingrédient incomplètes.")
                    }

                    const ingredientDocument = await databases.createDocument(
                        '66bffdcb002683b1c240',
                        '66c64b35001c828dabdb',
                        'unique()',
                        {
                            name: ingredient.name,
                            qty: parseInt(ingredient.quantity),
                            unit: ingredient.unit,
                        }
                    )

                    return ingredientDocument.$id
                })
            )

            const documentData = {
                title,
                description,
                cover_image,
                ingredients: ingredientIds,
                userId,
            }

            const newRecipe = await databases.createDocument(
                '66bffdcb002683b1c240',
                '66bffddc000b0cc2fc13',
                'unique()',
                documentData
            )

            // Add the new recipe to the list of recipes and update state
            setRecipes([...recipes, { ...newRecipe, servings: 1 }])
            alert('Recette créée avec succès !')
        } catch (error) {
            console.error('Échec de la création de la recette:', error)
            alert('Échec de la création de la recette. Veuillez réessayer.')
        }
    }

    const adjustQuantities = (newServings) => {
        const ratio = newServings / servings
        const adjustedIngredients = ingredients.map((ingredient) => ({
            ...ingredient,
            quantity: ingredient.quantity * ratio,
        }))
        setIngredients(adjustedIngredients)
        setServings(newServings)
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 font-inter">
                Créer une Recette
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Titre</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Image de couverture
                    </label>
                    <input
                        type="file"
                        onChange={handleCoverImageChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Portions</label>
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => adjustQuantities(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                        min="1"
                    />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-inter">
                    Ingrédients
                </h3>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            placeholder="Nom de l'ingrédient"
                            value={ingredient.name}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    'name',
                                    e.target.value
                                )
                            }
                            className="w-1/3 p-2 border rounded mr-2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantité"
                            value={ingredient.quantity}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    'quantity',
                                    e.target.value
                                )
                            }
                            className="w-1/4 p-2 border rounded mr-2"
                            required
                            min="0"
                        />
                        <input
                            type="text"
                            placeholder="Unité"
                            value={ingredient.unit}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    'unit',
                                    e.target.value
                                )
                            }
                            className="w-1/4 p-2 border rounded mr-2"
                        />
                        <button
                            type="button"
                            onClick={() => removeIngredientField(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addIngredientField}
                    className="text-blue-500 hover:text-blue-700 mb-4 mr-5"
                >
                    Ajouter un ingrédient
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600"
                >
                    Créer la recette
                </button>
            </form>
        </div>
    )
}

RecipeForm.propTypes = {
    setRecipes: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            $id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
            servings: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export default RecipeForm
