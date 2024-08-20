// src/components/Navbar.js

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../logic/authAppWrite/authSlice'
import { account } from '../config/appWrite' // Ensure this path is correct

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const handleLogout = async () => {
        try {
            await account.deleteSession('current') // Deletes the current session
            dispatch(logoutUser()) // Update Redux state
            navigate('/login') // Redirect to login
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-white hover:text-gray-400">
                        Explorer
                    </Link>
                </li>
                <li>
                    <Link
                        to="/my-recipes"
                        className="text-white hover:text-gray-400"
                    >
                        My Recipes
                    </Link>
                </li>
                {!user ? (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-400"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="text-white hover:text-gray-400"
                            >
                                Register
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-gray-400"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
