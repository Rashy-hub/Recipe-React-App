// src/components/SearchBar.js

import { useState } from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSearch} className="mb-4 flex justify-center">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for recipes..."
                className="p-2 border border-gray-300 rounded-l w-64"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
}

export default SearchBar
