import React,  { useState } from 'react'
import axios from 'axios';
import '../../css_part/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
    // const [firstName, setFirstName] = useState();
    // const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');

    // handling password icon
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

    // handling password confirmation
    // const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    // ✅ Strong password validation function
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // const result = strongPasswordRegex.test(password.trim());
        const result = strongPasswordRegex.test(password);
        console.log("Result: ", result);
        return result;
    };

    const handleSubmit = (e) =>{
        e.preventDefault();        

         // ✅ Check if password meets strength requirements
         if (!isStrongPassword(password)) {
            toast.error("❌ Weak Password! Must contains 1 uppercase, 1 lowercase, 1 number & 1 special character!", {
                toastId: "Weak Password"
            });
            return; // Stop form submission
        }


        if(password !== confirmPassword){
            toast.warning("⚠️ Passwords do not match!", {
                toastId: "Password-not-matching"
            });
        }
        else{
            // axios.post('http://localhost:4500/register', {firstName, lastName, email, password})
            axios.post('http://localhost:4500/register', {username, email, password})
            .then((result) => {
                if(result.data.message === "email"){
                    toast.info("📧 Email already exists!", {
                        toastId: "Email-exists"
                    });
                }
                else if(result.data.message === "password"){
                    toast.warning("Password Updated to the existing email!", {
                        toastId: "password-updated"
                    })
                    navigate('/login');
                }
                else{
                    toast.success("✅ Sign Up Successful! Redirecting to Login Page", {
                        toastId: "SignUp-Success"
                    });
                    
                    setTimeout(() => {
                        navigate('/login');
                    }, 2500);
                }

                // console.log(result);
            })
            .catch(error => console.log(error))
        }
    }

  return (
    <>
        <div className="signup-body">
            <div className="sign-up-container">
                <div className="sign-up-form-container">
                    <div>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <h1>Create New Account</h1>
                        </div>

                        <p>Join millions of users taking notes on Foodio</p>
                    </div>
                    <form className='edit-form' onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="signUpUsername" 
                            placeholder="Username" 
                            minLength="3" 
                            maxLength="16"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {/* <input 
                            type="text" 
                            name="signUpFirstName" 
                            placeholder="First Name" 
                            minLength="3" 
                            maxLength="16"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input 
                            type="text" 
                            name="signUpLastName" 
                            placeholder="Last Name" 
                            onChange={(e) => setLastName(e.target.value)}
                            required 
                        /> */}
                        <input 
                            type="email" 
                            name="signUpEmail"
                            placeholder="Email" 
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="signUpPassword" 
                            aria-describedby="passwordHelpBlock" 
                            placeholder="Enter Password" 
                            minLength="8" 
                            maxLength="20"
                            onChange={(e) => setPassword(e.target.value)}
                            autocomplete="new-password" 
                            required
                            // style={{marginBottom: '-12px'}}
                        />
                        <div style={{display:'flex', justifyContent: 'end', marginBottom: '-27px'}}>
                            <i className={`bx ${passwordVisible ? "bx-show" : "bx-hide"} eye-icon`} style={{bottom: '32px'}} onClick={() => setPasswordVisible(!passwordVisible)}></i>
                        </div>

                        <input 
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
                        
                        <button className='signup-button' type="submit" name="SignUpSubmit">
                            Create Account
                        </button>
                    </form>
                    
                    <br />

                    <div>
                        <p>
                            Already have an account? 
                            <br />
                            {/* <Link className='login-link' to="/login"> */}
                            <Link to="/login" className='login-link'>
                                Log in 
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default SignUp;