// src/components/Header.jsx

import PropTypes from 'prop-types'
import Navbar from '../components/NavBar'

const Header = ({ title }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <header className="bg-rose-300 text-black py-4 shadow-md fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-50 z-50 h-20">
            <div className="flex items-center justify-between w-full h-full px-4">
                <h1
                    className="block font-bungee text-2xl md:text-4xl font-bold  cursor-pointer whitespace-nowrap mx-auto"
                    onClick={scrollToTop}
                >
                    👩‍🍳 {title} 👩‍🍳
                </h1>
                <Navbar />
            </div>
        </header>
    )
}

// Restrictions sur les props
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
