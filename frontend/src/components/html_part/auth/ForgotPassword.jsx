import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../css_part/signup.css';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');

    // handling password icon
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const navigate = useNavigate();

    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (!isStrongPassword(password)) {
            toast.error("❌ Weak Password! Must contains 1 uppercase, 1 lowercase, 1 number & 1 special character!", {
                toastId: "weak-password"
            });
            return; 
        }

        if(password !== confirmPassword){
          toast.warning("⚠️ Passwords do not match!", {
            toastId: "password-not-matching-forgot"
          }); 
        }
        else{
            axios.post('http://localhost:4500/reset', { email, password})
            .then((result) => {
                if(result.data.message === "email"){
                  toast.info("📧 Email does not exists!", {
                    toastId: "email-not-exists-forgot"
                  });
                }
                else if(result.data.message === "same"){
                  toast.info("📧 Password is same for the existing email!", {
                    toastId: "password-same-forgot"
                  });
                }
                else if(result.data.message === "password"){
                    toast.success(" Password Updated!! Redirecting to Login Page!", {
                        toastId: "password-updated"
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 2500);
                }
            })
            .catch(error => console.log(error))
        }
    }
  return (
    <>
      <div className="signup-body">
        <div class="sign-up-container">
            <div class="sign-up-form-container">
                <div>
                <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <h1>Reset Password</h1>
                    {/* <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="black" style={{cursor:'pointer'}} class="bi bi-x" viewBox="0 0 16 16" onClick={() => setIsModalOpen(false)}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </div> */}
                </div>
                <p>Enter your email to create new password</p>
                </div>

                <form className='edit-form' onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="loginEmail" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input 
                    type={passwordVisible ? "text" : "password"} 
                    name="signUpPassword" 
                    aria-describedby="passwordHelpBlock" 
                    placeholder="New Password" 
                    minLength="8" 
                    maxLength="20"
                    onChange={(e) => setPassword(e.target.value)}
                    autocomplete="new-password" 
                    required
                    // style={{marginBottom: '-12px'}}
                />
                <div style={{display:'flex', justifyContent: 'end', marginBottom: '-27px'}}>
                    <i className={`bx ${passwordVisible ? "bx-show" : "bx-hide"} eye-icon`}
                    style={{bottom: '31px'}} onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                    </i>
                </div>
                <input 
                    // type="password" 
                    type={passwordConfirmVisible ? "text" : "password"}
                    aria-describedby="passwordHelpBlock" 
                    placeholder="Confirm Password" 
                    minLength="8" 
                    maxLength="20"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autocomplete="new-password" 
                    required
                    style={{marginBottom: '-11px'}}
                />
                <div style={{display:'flex', justifyContent: 'end'}}>
                    <i className={`bx ${passwordConfirmVisible ? "bx-show" : "bx-hide"} eye-icon`} onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}></i>
                </div>

                <button className='signup-button' type="submit" name="loginSubmit">Reset Password</button>
                </form>

                <br />

                <div>
                    <p>Remembered your password?
                        <br />
                        {/* <Link className='login-link' to="/login"> */}
                        <Link to="/login" className='login-link' >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>

            {/* <div class="signup-image">
                <img src="" alt="Error"/>
            </div> */}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword;