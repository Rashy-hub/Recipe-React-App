// src/components/PrivateRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
    const { session } = useSelector((state) => state.auth)

    if (!session) {
        return <Navigate to="/login" />
    }

    return children
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute
