// src/components/RoleBasedRoute.js

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = ({ roles, element, fallback }) => {
    const { user } = useSelector((state) => state.auth)

    if (user && roles.includes(user.role)) {
        return element
    }

    return <Navigate to={fallback} />
}

RoleBasedRoute.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    element: PropTypes.element.isRequired,
    fallback: PropTypes.string.isRequired,
}

export default RoleBasedRoute
