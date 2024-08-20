import PropTypes from 'prop-types'

const Footer = ({ title }) => {
    return (
        <footer className="bg-rose-300 text-black py-4 fixed bottom-0 w-full shadow-md backdrop-blur-md bg-opacity-50 z-50">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold">
                    &copy; {new Date().getFullYear()} {title}. All rights
                    reserved.
                </p>
                <p className="text-sm mt-2">Made with ❤️ by Rachid</p>
            </div>
        </footer>
    )
}

// Restrictions sur les props
Footer.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Footer
//adding a comment
