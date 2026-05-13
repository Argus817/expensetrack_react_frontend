import Navbar from '../components/Navbar';
import { useAuth } from '../utility/AuthContext';

const Profile = () => {
    const { username } = useAuth()
    return (
        <div>
            <Navbar />

            <div className="container my-4" style={{ transition: "0.5s" }}>
                <div className="jumbotron bg-body-secondary p-4 rounded" >
                    <h2 className="display-4">{username}</h2>
                    <p className="lead">Profile Page</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
