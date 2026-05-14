import { createContext, useContext, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <AuthContext.Provider value={{ username, setUsername, setIsLoading }}>
            {children}
            {isLoading && <LoadingSpinner />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);