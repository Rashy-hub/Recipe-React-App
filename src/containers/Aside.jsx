import PropTypes from 'prop-types'

const Aside = ({ children }) => {
    return (
        <aside className="p-6 bg-gray-100 rounded-lg shadow-lg">
            {children}
        </aside>
    )
}

// Validate the `children` prop
Aside.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Aside
