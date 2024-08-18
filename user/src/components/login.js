import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ValidationL from '../components/ValidationLogin';
import log from '../login2.avif'

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ email: '', pass: '' });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const checkLogin = async (e) => {
        e.preventDefault();

        const validationErrors = ValidationL({ email, pass });
        setError(validationErrors);

        if (!validationErrors.email && !validationErrors.pass) {
            try {
                const res = await axios.post("http://localhost:5000/login", { email, pass });
                console.log('Server response:', res.data);  // Log the response to debug
                if (res.data.status === 'success') {
                    const userId = res.data.id.id;;
                    if (userId) {
                        navigate(`/Home/${userId}`);
                    } else {
                        console.error('User ID is missing in the response');
                        alert("Login successful, but user ID is missing.");
                    }
                } else {
                    alert("Invalid username or password");
                }
            } catch (err) {
                console.log('Error logging in:', err);
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container pt-5 pb-5 box d-flex justify-content-evenly">
                <form onSubmit={checkLogin}>
                    <h1 className="mb-5 text-primary">Log In</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small><br />
                        {error.email && <span className='text-danger'>{error.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="mt-2">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        {error.pass && <span className='text-danger'>{error.pass}</span>}
                        <p className="form-text text-muted"><Link to="/forgot">Forgot password?</Link>.</p>
                        
                    </div>
                    <p className="form-text text-muted mt-5">Don't have an account? <Link to="/signup">Sign up now</Link>.</p>
                    <button type="submit" className="btn btn-primary login1 ">Log In</button>
                </form>
                <img src={log} style={{width: '50%', height: '50%'}} alt='img'></img>
            </div>

        </div>
    );
}

export default Login;
