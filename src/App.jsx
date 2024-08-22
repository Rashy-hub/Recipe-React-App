// src/App.jsx

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './logic/authAppWrite/authSlice'

import SplashPage from './pages/SplashPage'
import Header from './containers/Header'
import PrivateRoute from './components/PrivateRoute'
import ExplorerPage from './pages/ExplorerPage' // Assurez-vous que ce fichier existe
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
function App() {
    const dispatch = useDispatch()
    const { isCheckingAuth, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (isCheckingAuth) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">Loading...</div>
            </div>
        )
    }

    // Redirection automatique si une session est active
    if (user) {
        return <Navigate to="/myrecipes" />
    }

    return (
        <Router>
            <Header title="Recipe Dream" />
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/myrecipes"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/explorer"
                    element={
                        <PrivateRoute>
                            <ExplorerPage />
                        </PrivateRoute>
                    }
                />
                {/* Redirection automatique si l'utilisateur est déjà connecté */}
                <Route
                    path="/redirect"
                    element={<Navigate to="/myrecipes" />}
                />
            </Routes>
        </Router>
    )
}

export default App
