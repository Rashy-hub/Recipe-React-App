import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../logic/authAppWrite/authSlice'
import { account } from '../config/appWrite'
import { useState } from 'react'

const Navbar = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { session } = useSelector((state) => state.auth)

    const handleLogout = async (event) => {
        event.stopPropagation()
        if (isLoggingOut) return
        setIsLoggingOut(true)
        try {
            // If the user is already a guest, just redirect to login
            const session = await account
                .getSession('current')
                .catch(() => null)

            if (!session) {
                navigate('/login')
            } else {
                await dispatch(logoutUser()).unwrap()

                await account.deleteSession('current')
                navigate('/login')
            }
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <nav className="bg-transparent font-extrabold">
            <ul className="flex space-x-4 font-inter">
                {session ? (
                    <>
                        <li>
                            <Link
                                to="/explorer"
                                className="text-neutral-950 hover:text-gray-400  "
                            >
                                Explorer
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/myrecipes"
                                className="text-neutral-950 hover:text-gray-400"
                            >
                                My Recipes
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="text-neutral-950 hover:text-gray-400"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="text-neutral-950 hover:text-gray-400"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="text-neutral-950 hover:text-gray-400"
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
