import React, { useState, useEffect } from "react";
import "../../css_part/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    food: "",
    hobbies: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("foodio_user");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      setForm({
        username: parsedUser.username || "",
        email: parsedUser.email || "",
        address: parsedUser.address || "",
        food: parsedUser.food || "",
        hobbies: parsedUser.hobbies || "",
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Merge new fields into user object
    const updatedUser = {
      ...user,
      username: form.username,
      email: form.email,
      address: form.address,
      food: form.food,
      hobbies: form.hobbies,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!", {
      toastId: "edit-profile-success",
    });
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data

    toast.success(" Logged Out Successfully!...", {
      toastId: "Logged-out-profile",
    });
    setTimeout(() => {
      setUser(null); // Reset state
      window.location.reload(); // Refresh page to reflect changes
    }, 1600);
  };

  if (!user) return <h2>Redirecting to home...</h2>;

  return (
    <div className="profile-div">
      <div className="profile-sidenav">
        <div className="profile">
          <img
            src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png"
            alt="Error"
            width="100"
            height="100"
          />

          <div className="profile-name">
            {/* Welcome, {user.firstName} {user.lastName}! */}
            Welcome, {user.username}!
          </div>
        </div>

        <div className="sidenav-url">
          <div className="url">
            <Link to="/profile" className="profile-link"> Profile </Link>
            <hr align="center" />
          </div>
          <div className="url">
            <Link to="/editProfile" className="profile-link active">Edit</Link>
            <hr align="center" />
          </div>
          <div className="profile-logout-button">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
      <div className="profile-main">
        <h2>Edit Profile</h2>
        <form className="profile-card" onSubmit={handleSubmit}>
          <div className="card-body">
            <table>
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Favourite Food</td>
                  <td>
                    <input
                      type="text"
                      name="food"
                      value={form.food}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hobbies</td>
                  <td>
                    <input
                      type="text"
                      name="hobbies"
                      value={form.hobbies}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
