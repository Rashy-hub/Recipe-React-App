import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../logic/authAppWrite/authSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, session } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(registerUser({ email, password, name })).unwrap()

            navigate('/myrecipes')
        } catch (err) {
            setError('Failed to register: ' + err.message)
        }
    }

    useEffect(() => {
        if (session || user) {
            navigate('/myrecipes')
        }
    }, [session, user, navigate])

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-32"
        >
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
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
                Register
            </button>
        </form>
    )
}

export default Register
