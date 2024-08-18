import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from '../components/ValidationSignup';
import log from '../signup.avif'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [data, setData] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const [error,setError] = useState({});
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
    
        const validationErrors = Validation({ name, email, pass });
        setError(validationErrors);
    
        // Check for validation errors before proceeding
        if (!validationErrors.name && !validationErrors.email && !validationErrors.pass) {
            try {
                const response = await axios.post('http://localhost:5000/data', { name, email, pass });
                setData([...data, response.data]);
                
                navigate("/");
                setName('');
                setEmail('');
                setPass('');
            } catch (err) {
                console.log(err);
            }
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container pb-5 pt-5 d-flex justify-content-evenly box">
                <form>
                    <h1 className="mb-5 text-primary">Sign Up</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {error.name && <span className='text-danger'>{error.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="mt-3">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            name='email'
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small><br/>
                        {error.email && <span className='text-danger'>{error.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="mt-2">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="exampleInputPassword1"
                                name='pass'
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
                    </div>
                    
                    <Link to="/login" className="btn btn-primary mt-5 login">🡰 Log In</Link>
                    <Link to="/signup" className="btn btn-primary mt-5 ms-3 signup" onClick={handleSignup}>Sign Up</Link>
                </form>
                <img src={log} style={{width: '50%' , height: '50%'}} alt='img'></img>
            </div>
        </div>
    );
}

export default Signup;
