import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import log from '../forgot.avif'

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/reset-password', { token, newPassword });
            if (res.data.message === 'Password has been reset') {
                setMessage('Password has been reset successfully.');
                setTimeout(() => navigate('/'), 3000);  // Redirect to login page after 3 seconds
            } else {
                setError(res.data.message || 'Error resetting password');
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            setError('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container p-5 box d-flex justify-content-evenly">
                <form onSubmit={handleSubmit} className='mt-3'>
                    <h1 className="mb-5 text-primary">Reset Password</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <div className='input-group'>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <div className='input-group'>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Reset Password</button>
                </form>
                <img src={log} style={{width: '50%', height: '50%'}} alt='img'></img>
            </div>
        </div>
    );
}

export default ResetPassword;
