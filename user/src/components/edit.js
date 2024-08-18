import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../App.css'

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({
        todos: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/edit/${id}`)
            .then(res => setTodo(res.data[0]))
            .catch(err => {
                console.log(err);
                setError('Failed to fetch todo.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/update/${id}`, todo)
            .then(res => {
                console.log(res);
                navigate(`/home/${id}`);
            })
            .catch(err => { 
                console.error(err);
                setError('Failed to update todo');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container w-50 p-5 box">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="to-dos">Edit Your To-Do Work:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="to-dos" 
                            placeholder="Enter your To-Do Work" 
                            value={todo.todos}
                            onChange={(e) => setTodo({...todo, todos: e.target.value})}  
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Edit</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
