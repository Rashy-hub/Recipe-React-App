import PropTypes from 'prop-types'
const Main = ({ children }) => {
    return (
        <main className="flex-grow w-full max-w-7xl p-6 mt-20 mx-auto">
            {children}
        </main>
    )
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Main
