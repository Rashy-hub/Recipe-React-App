import PropTypes from 'prop-types'
import Navbar from '../components/NavBar'
const Header = ({ title }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <header className="bg-rose-300 text-black py-4 shadow-md fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-50 z-50">
            <div className="container mx-auto flex justify-center items-center">
                <h1
                    className="font-mono  text-4xl font-bold text-center cursor-pointer flex items-center"
                    onClick={scrollToTop}
                >
                    👩‍🍳 {title} 🍽
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
//adding a comment
