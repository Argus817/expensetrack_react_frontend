import { useState } from 'react'
import LoginRegisterCommon from './LoginRegisterCommon'
import { Link } from 'react-router-dom'
import api from '../api/Axios'
import AlertMessages from '../components/AlertMessages'

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        password_confirm: ""
    })

    const [apiMessages, setApiMessages] = useState([])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        if (apiMessages.length > 0) setApiMessages([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post('/auth/token/register/',
                { username: form['username'], password: form['password'] }
            )

            if (res.status === 200) {
                setApiMessages([{ text: <div>{res.data.message}. <Link to='/login'>Log in?</Link></div>, tags: "success" }])
            }
        } catch (err) {
            console.error(err)
            const mess = []
            if (err.response) {
                if (err.response.data.username) {
                    mess.push({ text: err.response.data.username, tags: "danger" })

                }
                else {
                    mess.push({ text: "An error occurred during registration.", tags: "danger" });
                }
            }
            else {
                mess.push({ text: "Network error. Please try again.", tags: "danger" });
            }

            setApiMessages(mess)
        }
        setForm({
            username: "",
            password: "",
            password_confirm: ""
        })
    }

    const clientMessages = []
    if (form.password.length > 0 && form.password.length < 4) {
        clientMessages.push({ text: "Password is less than 4 characters long", tags: "danger" })
    }
    if (form.password_confirm.length > 0 && form.password !== form.password_confirm) {
        clientMessages.push({ text: "Passwords don't match", tags: "danger" })
    }

    const allMessages = [...clientMessages, ...apiMessages]

    const isDisabled = !form.username.trim() ||
        form.password.length < 4 ||
        form.password !== form.password_confirm;

    return (
        <LoginRegisterCommon>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>

            <AlertMessages messages={allMessages} />

            <form className='mb-3' onSubmit={handleSubmit}>
                <input id="action" name="action" type="hidden" value="login" />
                <input id="username" onChange={handleChange} name="username" className="form-control login-form-inputs" placeholder="Username" required="" type="text" autoCapitalize="none" value={form.username} />
                <input id="password" onChange={handleChange} name="password" className="form-control login-form-inputs" placeholder="Password" required="" type="password" value={form.password} />
                <input id="password_confirm" onChange={handleChange} name="password_confirm" className="form-control login-form-inputs" placeholder="Confirm Password" required="" type="password" value={form.password_confirm} /><br />
                <button className="btn btn-lg btn-primary btn-block" disabled={isDisabled} type="submit">
                    <i className="bi bi-box-arrow-right"></i>
                    Register
                </button>
            </form>
            Already have an account? <Link to='/login'>Log in</Link>
        </LoginRegisterCommon>
    )
}

export default Register
