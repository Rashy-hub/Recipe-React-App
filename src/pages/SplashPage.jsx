// src/components/SplashPage.jsx

import { Link } from 'react-router-dom'
import Main from '../containers/Main'

const SplashPage = () => {
    return (
        <>
            <Main>
                <div className="mx-auto w-1/2">
                    <h1 className="text-4xl font-bold mb-8">
                        Welcome to Recipe Dream
                    </h1>
                    <p className="text-xl mb-4">
                        Discover, create, and save your favorite recipes.
                    </p>
                    <div>
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline mr-4"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </Main>
        </>
    )
}

export default SplashPage
