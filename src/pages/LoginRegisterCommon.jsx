import ThemeButton from '../components/ThemeButton'
import '../assets/loginpage.css'
import { useEffect } from 'react';

const LoginRegisterCommon = ({ children }) => {
    
    useEffect(() => {
        document.body.classList.add('special-body-style');
        return () => document.body.classList.remove('special-body-style');
    }, []);

    return (
        <div className="text-center">
            <h1>Expense Tracker</h1>
            {children}
            <br></br>
            <h4>
                <ThemeButton />
            </h4>
        </div>
    )
}

export default LoginRegisterCommon
