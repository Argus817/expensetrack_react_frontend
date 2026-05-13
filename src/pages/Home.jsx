import Navbar from '../components/Navbar'

import { useAuth } from '../utility/AuthContext'

const Home = () => {
    const { username } = useAuth()

    return (
        <div>
            <Navbar />
            <div className="container my-4">
                <div className="jumbotron bg-body-secondary p-4 rounded">
                    <h1 className="display-4">Welcome {username}</h1>
                    <p className="lead">Manage your bills effortlessly with Expense Tracker.</p>

                </div>
            </div>

        </div>
    )
}

export default Home
