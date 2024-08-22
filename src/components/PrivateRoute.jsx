// src/components/PrivateRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
    const { session } = useSelector((state) => state.auth)

    // Si l'utilisateur est connecté, on redirige vers la route protégée
    if (!session) {
        return <Navigate to="/login" />
    }

    // Si l'utilisateur est connecté, on affiche les enfants (route protégée)
    return children
}

// Restrictions sur les props
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute
