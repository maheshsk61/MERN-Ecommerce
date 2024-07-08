import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Login() {
    const [registeredEmail, setRegisteredEmail] = useState('')
    const [registeredPwd, setregisteredPwd] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorEmailSymbol, setErrorEmailSymbol] = useState(false)
    const [errorPwd, setErrorPwd] = useState(false)
    const [pwdRegex, setPwdRegex] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const handleEmailChange = (e) => {
        setRegisteredEmail(e.target.value)
    }
    const handlePwdChange = (e) => {
        setregisteredPwd(e.target.value)
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{4,}$/
    const handleLoginValidation = (e) => {
        e.preventDefault()
        if (!registeredEmail.trim()) {
            setErrorEmail('Please enter an email')
            return false
        }
        setErrorEmail(false)
        if (!registeredEmail.trim().includes("@")) {
            setErrorEmailSymbol('Email must have @ symbol')
            return false
        }
        setErrorEmailSymbol(false)
        if (!registeredPwd.trim()) {
            setErrorPwd('please enter your password')
            return false
        }
        setErrorPwd(false)
        if (!passwordRegex.test(registeredPwd)) {
            setPwdRegex('Password must contain atleast one Upper & lowercase, number & symbol')
            return false
        }
        setPwdRegex(false)
        axios.post('http://localhost:2000/Account/Login', {
            email: registeredEmail,
            password: registeredPwd
        })
            .then((res) => {
                setResponseMessage(res.data);
                setRegisteredEmail('')
                setregisteredPwd('')
                setTimeout(() => {
                    setResponseMessage('')
                }, 5000);
            })
            .catch((e) => {
                console.log(`Error while posting data ${e}`);
            })
        return true
    }
    return (
        <div className='container'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {responseMessage && <h3 className={`alert ${responseMessage.includes("Login Successful") ?
                    'alert-success text-success' : 'alert-danger text-danger'} text`}>{responseMessage}</h3>}
            </div>
            <div className="row">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="col-xs-6 col-md-4">
                        <form onSubmit={handleLoginValidation} method='post'>
                            <div className='EmailFromLogin d-flex flex-column'>
                                <label for='email'><b>Email </b></label>
                                <input type="text" placeholder="Enter your registered email" id="email" className='box' value={registeredEmail} onChange={handleEmailChange} />
                            </div>
                            <div className="Error">
                                <div className='text-danger'>{errorEmail && errorEmail}{errorEmailSymbol && errorEmailSymbol}</div>
                            </div>
                            <div className="PasswordFromLogin d-flex flex-column">
                                <label for='password'><b>Password </b></label>
                                <input type="password" placeholder="Enter your registered password" id="password" className='box' value={registeredPwd} onChange={handlePwdChange} />
                            </div>
                            <div className="Error">
                                <div className='text-danger'>{errorPwd && errorPwd}{pwdRegex && pwdRegex}</div>
                            </div>
                            <div className="Login text-center">
                                <button type='submit' className='btn btn-primary shadow-none'>Login</button>
                            </div>
                        </form>
                        <h3 className='text-center'><u>Don't have an account?</u></h3>
                        <Link to='/Account/Register' className='text-decoration-none'>
                            <h2 className='text-center text-primary'>Sign up</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login 