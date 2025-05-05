import React, { useState } from 'react'
import '../../css_part/signup.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const location = useLocation();
  // const [loading, setLoading] = useState(false);

  // handling password icon
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
      e.preventDefault();
      // setLoading(true);

      axios.post(`${process.env.REACT_APP_BACKEND_URL}/loginCheck`, {email, password})
      .then((result) => {
          console.log(result.data.message);

          if(result.data.message === "Login successfull!"){
            toast.success(" Login Successful! Redirecting to home page!", {
              toastId: "login-success"
            });

            localStorage.setItem("user", JSON.stringify(result.data.user));
            
            setTimeout(() => {
              navigate('/');
              window.location.reload();
            }, 2500);  // Delay of 2 seconds (2000ms)
          }
          else if(result.data.message === "password incorrect"){
            toast.warning("⚠️ Passwords is incorrect!", {
              toastId: "password-incorrect-login"
            });
          }
          else if(result.data.message === "No record found!"){
            toast.warning("Email does not exists!", {
              toastId: "email-not-exists"
            });
          }
      })
      .catch(error => console.log(error))
      // .finally(() => setLoading(false)); // Stop loading after response
  }

  return (
    <>
      <div className="signup-body">
        <div className="sign-up-container">
          <div className="sign-up-form-container">
              <div>
                  <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <h1>Log In</h1>
                  </div>
                  <p>Millions of users are taking notes on Foodio</p>
              </div>

              <form className='edit-form' onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  name="loginUserEmail" 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
                <input 
                  // className="password"
                  type={passwordVisible ? "text" : "password"} 
                  name="loginUserPassword" 
                  placeholder="Password"
                  // autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{marginBottom: '-11px'}}
                />

                <div style={{display:'flex', justifyContent: 'end'}}>
                  <i 
                      className={`bx ${passwordVisible ? "bx-show" : "bx-hide"} eye-icon`}
                      onClick={() => setPasswordVisible(!passwordVisible)}>
                  </i>
                </div>

                {/* <Link className='login-link' to="/reset"> */}
                <Link to="/forgot" className='login-link'>
                  Forgot password?
                </Link>
                
                <button className='signup-button' type="submit" name="loginSubmit">Log In</button>
                {/* <button className='signup-button' type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button> */}
              </form>


              <br />

              <div>
                  <p>Don't have an account? 
                    {/* <Link className='login-link' to="/" onClick={() => setIsModalOpen(true)} style={{marginLeft: '7px'}}> */}
                    <Link className='login-link' to="/signup" style={{marginLeft: '7px'}}>
                      Create a new account
                    </Link>
                    {/* <SignUp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
                  </p>
              </div>
          </div>

          {/* <div className="signup-image">
              <img src="" alt="Error"/>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Login;