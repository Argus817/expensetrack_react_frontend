import { useState } from 'react'
import LoginRegisterCommon from './LoginRegisterCommon'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/Axios'
import { useAuth } from '../utility/AuthContext'

const Login = () => {
    const {setUsername} = useAuth()

    const navigate = useNavigate() 

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const [apiMessages, setApiMessages] = useState([])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post('/auth/token/', form, {_noInterceptor: true})

            localStorage.setItem("access_token", res.data.access)
            localStorage.setItem("username", res.data.username)

            setUsername(res.data.username)

            navigate('/')

        } catch (err) {
            console.error(err)
            setApiMessages([{ text: "Invalid Credentials", tags: "danger" }])
        }
    }

    const allMessages = [...apiMessages]

    return (
        <LoginRegisterCommon>
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>

            {/* Render all errors/success messages */}
            {allMessages.map((msg, index) => (
                <div
                    key={index}
                    className={`alert login-alerts alert-${msg.tags === 'error' ? 'danger' : msg.tags}`}
                >
                    {msg.text}
                </div>
            ))}

            <form className='mb-3' onSubmit={handleSubmit}>
                <input
                    name="username"
                    className="form-control login-form-inputs"
                    placeholder="Username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    className="form-control login-form-inputs"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                /><br />

                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    <i className="bi bi-box-arrow-right"></i>
                    Sign in
                </button>
            </form>

            Not a member? <Link to='/register'>Register</Link>
        </LoginRegisterCommon>
    )
}

export default Login