import React from 'react'
import { Link } from 'react-router-dom';
import log from '../home.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function First() {
    return (
        <div className='d-flex justify-content-center align-items-center container'>
            <div className="container p-5 d-flex justify-content-evenly firstpage">
                <div className='w-100' style={{paddingTop: "80px"}}>
                    <h1 className='w-100 text-white' style={{fontSize: "70px"}}>Welcome to Our Web</h1>
                    <Link to="/login" className='btn btn-primary mt-3 login'>Login Now 🡺</Link>
                </div>
                <img src={log} alt='img' style={{ width: '50%' }}></img> 
            </div>
        </div>
    )
}

export default First
