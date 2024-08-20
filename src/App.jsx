// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './logic/authAppWrite/authSlice'
import Dashboard from './components/Dashboard'
import MyRecipes from './components/MyRecipes'

import Login from './components/Login'
import Register from './components/Register'

import Header from './containers/Header'

function App() {
    const dispatch = useDispatch()
    const { status, isCheckingAuth } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (isCheckingAuth) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">Loading... {status}</div>
            </div>
        )
    }

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/my-recipes" element={<MyRecipes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
