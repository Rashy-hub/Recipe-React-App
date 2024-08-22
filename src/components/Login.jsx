import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, loginUser } from '../logic/authAppWrite/authSlice'

const Login = () => {
    const [email, setEmail] = useState('roberto@gmail.com')
    const [password, setPassword] = useState('Test123+')
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { session, isCheckingAuth, sessionIsActive } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        const goToDashPage = () => navigate('/myrecipes')
        if (!isCheckingAuth) {
            if (sessionIsActive) {
                console.log(
                    'User logged in detected, redirecting to /myrecipes'
                )
                goToDashPage()
            } else if (sessionIsActive === null) {
                console.log('Session state is null, dispatching checkAuth')
                dispatch(checkAuth())
            }
        }
    }, [dispatch, navigate, isCheckingAuth, sessionIsActive])

    const handleSubmit = async (e) => {
        const goToDashPage = () => navigate('/myrecipes')
        e.preventDefault()
        if (session) {
            setError('You are already logged in.')
            return
        }
        try {
            await dispatch(loginUser({ email, password })).unwrap()
            console.log('User logged in, redirecting to /myrecipes')
            goToDashPage()
        } catch (err) {
            setError('Failed to login: ' + err.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-32"
        >
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Password:
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Login
            </button>
        </form>
    )
}

export default Login
