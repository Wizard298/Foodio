import React, { useEffect, useState }  from 'react';
import '../../css_part/profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("foodio_user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        } 
        else {
            navigate("/"); 
        }
    }, [navigate]);

    if (!user) {
        // return <p>Loading profile...</p>;
        return <h2>Re-rendering to home page...</h2>;
    }

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data

        toast.success(" Logged Out Successfully!...", {
            toastId: "Logged-out-profile"
        });
        setTimeout(() => {
            setUser(null); // Reset state
            window.location.reload(); // Refresh page to reflect changes
        }, 1600);
    };

  return (
    <>
    <div className='profile-div'>
        <div className="profile-sidenav">
            <div className="profile">
                <img src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png" alt="Error" width="100" height="100"/>

                <div className="profile-name">
                    {/* Welcome, {user.firstName} {user.lastName}! */}
                    Welcome, {user.username}!
                </div>
            </div>

            <div className="sidenav-url">
                <div className="url">
                    <Link to="/profile" className="profile-link active">Profile</Link>
                    <hr align="center"/>
                </div>
                <div className="url">
                    <Link to="/editProfile" className="profile-link" >Edit</Link>
                    <hr align="center"/>
                </div>
                <div className="profile-logout-button">
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>


        <div className="profile-main">
            <h2>IDENTITY</h2>
            <div className="profile-card">
                <div className="card-body">
                    <i className="fa fa-pen fa-xs edit"></i>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>:</td>
                                <td>{user.username}</td>
                            </tr>
                            {/* <tr>
                                <td>Last Name</td>
                                <td>:</td>
                                <td>{user.lastName}</td>
                            </tr> */}
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>{user.address}</td>
                            </tr>
                            <tr>
                                <td>Favourite food</td>
                                <td>:</td>
                                <td>{user.food}</td>
                            </tr>
                            <tr>
                                <td>Hobbies</td>
                                <td>:</td>
                                <td>{user.hobbies}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Profile;