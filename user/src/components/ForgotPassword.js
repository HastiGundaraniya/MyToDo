import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import log from '../forgot.avif'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError('Error sending password reset link.');
            setMessage('');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container p-5 box d-flex justify-content-evenly">
                <form onSubmit={handleForgotPassword} className='mt-5'>
                    <h1 className="mb-5 text-primary">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {message && <p className="text-success mt-0">{message}</p>}
                        {error && <p className="text-danger mt-0">{error}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Send Reset Link</button>
                </form>
                <img src={log} style={{width: '50%', height: '50%'}} alt='img'></img>
            </div>
            
        </div>
    );
}

export default ForgotPassword;
