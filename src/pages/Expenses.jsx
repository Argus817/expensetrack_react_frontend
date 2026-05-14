import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AlertMessages from '../components/AlertMessages';

import api from '../api/Axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../utility/AuthContext';

const Expenses = () => {

    const navigate = useNavigate()

    const [messages, setMessages] = useState([])
    const [expenseList, setExpenseList] = useState([])
    const [total, setTotal] = useState(0.00)
    
    const { setIsLoading } = useAuth()

    const getExpenseData = async () => {
        setIsLoading(true)
        try {
            const res = await api.get('/api/expense/')
            setExpenseList(res.data)

            const totalAmount = res.data.reduce(
                (acc, expense) => acc + Number(expense.amount),
                0
            )

            setTotal(totalAmount.toFixed(2))

        } catch (err) {
            console.error(err)
            setMessages([{ text: "Api error", tags: "danger" }])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getExpenseData()
    }, [])

    return (
        <div>
            <Navbar />
            <div className='container my-5'>
                <h2 className='text-center mb-4'>Expense List</h2>

                <button
                    className='btn btn-primary mb-3'
                    onClick={() => navigate('/expenses/new/add')}
                >
                    Add Expense
                </button>

                <AlertMessages messages={messages} />

                <div className='table-responsive'>
                    <table className='table table-striped table-hover'>
                        <thead className='table'>
                            <tr>
                                <th scope='col'>No</th>
                                <th className='text-end' scope='col'>Amount</th>
                                <th scope='col'> </th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Date and Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {expenseList.map((expense, index) => (
                                <tr key={expense.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/expenses/update/${expense.id}`)}>
                                    <td>{index + 1}</td>
                                    <td className='text-end'>{expense.amount}</td>
                                    <td></td>
                                    <td>{expense.description}</td>
                                    <td>{new Date(expense.timestamp)
                                        .toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td className='text-end'>{total}</td>
                                <td></td>
                                <td className='fw-bold'>Total</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Expenses
