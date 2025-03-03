import React, { useState } from 'react'
import '../css_part/signup.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import SignUp from './SignUp';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const location = useLocation();
  // const [loading, setLoading] = useState(false);
  // const [modal, setModal] = useState(isModalOpen);

  // useEffect(() => {
  //   setModal(isModalOpen);
  // }, [isModalOpen]);

  // handling password icon
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
      e.preventDefault();
      // setLoading(true);

      axios.post('http://localhost:3500/loginCheck', {email, password})
      .then((result) => {
          console.log(result.data.message);

          if(result.data.message === "Login successfull!"){
            toast.success(" Login Successful! Redirecting to home page!");

            localStorage.setItem("user", JSON.stringify(result.data.user));
            
            setTimeout(() => {
              // setIsModalOpen(false);
              navigate('/home');
              window.location.reload();
            }, 2500);  // Delay of 2 seconds (2000ms)
          }
          else if(result.data.message === "password incorrect"){
            toast.warning("⚠️ Passwords is incorrect!");
          }
          else if(result.data.message === "No record found!"){
            toast.warning("Email does not exists!");
          }
      })
      .catch(error => console.log(error))
      // .finally(() => setLoading(false)); // Stop loading after response
  }

  // const handleCross = () => {
  //   // setModal(false);
  //   // isModalOpen = false;
  //   window.location.reload();
  // }

  return (
    <>
      <ToastContainer position="top-center" autoClose={7000} />
      <div className="signup-body">
        <div className="sign-up-container">
          <div className="sign-up-form-container">
              <div>
                  <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <h1>Log In</h1>
                    {/* <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="black" style={{cursor:'pointer'}} class="bi bi-x" viewBox="0 0 16 16" >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                      </svg>
                    </div> */}
                  </div>
                  <p>Millions of users are taking notes on Freelancify</p>
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