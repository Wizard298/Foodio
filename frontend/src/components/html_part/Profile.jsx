import React, { useEffect, useState }  from 'react';
import '../css_part/profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
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
                    Welcome, {user.firstName} {user.lastName}!
                </div>
                {/* <div className="job">
                    Web Developer
                </div> */}
            </div>

            <div className="sidenav-url">
                <div className="url">
                    <Link to="/profile" className="active" style={{marginLeft: "17%"}}>Profile</Link>
                    <hr align="center"/>
                </div>
                <div className="url">
                    <Link to="/profile">Edit</Link>
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
                                <td>First Name</td>
                                <td>:</td>
                                <td>{user.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>:</td>
                                <td>{user.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>Bali, Indonesia</td>
                            </tr>
                            <tr>
                                <td>Hobbies</td>
                                <td>:</td>
                                <td>Diving, Reading Book</td>
                            </tr>
                            <tr>
                                <td>Job</td>
                                <td>:</td>
                                <td>Web Developer</td>
                            </tr>
                            <tr>
                                <td>Skill</td>
                                <td>:</td>
                                <td>PHP, HTML, CSS, Java</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2>SOCIAL MEDIA</h2>
            <div className="profile-card">
                <div className="card-body">
                    <i className="fa fa-pen fa-xs edit"></i>
                    <div className="social-media">
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile