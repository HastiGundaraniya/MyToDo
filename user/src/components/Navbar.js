import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div style={{ marginBottom: "150px" }}>
            <nav className="navbar fixed-top navbar-light bg-light d-flex justify-content-between align-items-center">
                <h1 className='text-primary ms-3 head'><b>My To-Do List</b></h1>
                <div className="d-flex me-5">
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-2">
                            <Link to='/' className="badge nav-link text-primary ">Home</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link to='/Signup' className="badge nav-link text-primary">Sign-Up</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link to='/login' className="badge nav-link text-primary">My-To-Do</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
