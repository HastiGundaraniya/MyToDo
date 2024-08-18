import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Add_todo from './components/Add_todo';
import Login from './components/login';
import Signup from './components/Signup';
import './App.css';
import Navbar from './components/Navbar';
import First from './components/First';
import Edit from './components/edit';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<First />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home/:id" element={<Home />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/addtodo/:id" element={<Add_todo />} />
            </Routes>
        </Router>
    );
}

export default App;
