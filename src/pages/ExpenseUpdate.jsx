import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import AlertMessages from '../components/AlertMessages'
import api from '../api/Axios'

const ExpenseUpdate = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [messages, setMessages] = useState([])

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
    })

    const getExpense = async () => {

        try {

            const res = await api.get(`/api/expense/update/${id}/`)

            setFormData({
                description: res.data.description,
                amount: res.data.amount,
            })

        } catch (err) {

            console.error(err)

            setMessages([
                { text: 'Failed to load expense', tags: 'danger' }
            ])
        }
    }

    useEffect(() => {
        getExpense()
    }, [])

    const handleChange = (e) => {
        let value = e.target.value;

        if (e.target.name === 'amount') {
            // Regex: matches digits, and optionally a period followed by up to 2 digits
            const regex = /^\d*\.?\d{0,2}$/

            if (regex.test(value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: value
                })
            }
            // If it doesn't match the regex, we simply don't update the state,
            // effectively "blocking" the third decimal place.
        } else {
            setFormData({
                ...formData,
                [e.target.name]: value
            })
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const payload = {
                description: formData.description,
                amount: formData.amount
            }

            await api.put(`/api/expense/update/${id}/`, payload)

            navigate('/expenses')

        } catch (err) {

            console.error(err)

            setMessages([
                { text: 'Update failed', tags: 'danger' }
            ])
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/api/expense/update/${id}/`)
            navigate('/expenses')
        } catch (err) {

            console.error(err)

            setMessages([
                { text: 'Delete failed', tags: 'danger' }
            ])
        }
    }

    return (
        <div>

            <Navbar />

            <div className='container my-5'>

                <h2 className='mb-4 text-center'>
                    Update Expense
                </h2>

                <AlertMessages messages={messages} />

                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>

                        <label className='form-label'>
                            Description
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className='mb-3'>

                        <label className='form-label'>
                            Amount
                        </label>

                        <input
                            type='number'
                            step='0.01'
                            className='form-control'
                            name='amount'
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    

                    <>
                        <button
                            type='submit'
                            className='btn btn-success'
                        >
                            Update Expense
                        </button>
                        <> </>
                        <button type='button' className='btn btn-danger' onClick={handleDelete}>
                            Delete Expense
                        </button>
                    </>
                </form>



            </div>

        </div>
    )
}

export default ExpenseUpdate