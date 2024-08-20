// src/components/Ingredient.js

import PropTypes from 'prop-types';

const Ingredient = ({ index, ingredient, onChange }) => {
    return (
        <div className="mb-4 p-4 border border-gray-200 rounded">
            <label className="block text-sm font-medium mb-2">Ingredient {index + 1} Name:</label>
            <input
                type="text"
                value={ingredient.name}
                onChange={(e) => onChange('name', e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium mt-2 mb-2">Quantity:</label>
            <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => onChange('quantity', e.target.value)}
                min="0"
                className="block w-full p-2 border border-gray-300 rounded"
            />
        </div>
    );
};

Ingredient.propTypes = {
    index: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

export default Ingredient;
