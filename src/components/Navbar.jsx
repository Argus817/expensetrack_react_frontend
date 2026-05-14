import ThemeButton from './ThemeButton'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../api/Axios';
import { useAuth } from '../utility/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { username, setUsername, setIsLoading } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        setIsLoading(true)
        const res = await api.post('/auth/token/logout/', {}, { withCredentials: true } )

        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        setUsername(null)

        setIsLoading(false)
        navigate('/login')
    }

    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar bg-body-secondary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand">Expense Tracker</a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/expenses/" className="nav-link">Expenses</NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link"><ThemeButton /></a>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/profile/" className="nav-link"><i className="bi bi-person-circle"></i> {username}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link btn" onClick={logout}>
                                        <i className="bi bi-box-arrow-right"></i> Logout 
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar
