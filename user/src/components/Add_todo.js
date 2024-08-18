import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Add_todo() {
    const [todo, setTodo] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/addtodo/${id}`, { todo });
            setData([...data, { id: response.data.insertId, todo }]); 
            navigate(`/home/${id}`);
            setTodo('');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container w-50 p-5 box">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="to-dos">Your To-Do Work:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="to-dos" 
                            placeholder="Enter your To-Do Work" 
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}  
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Add +</button>
                </form>
            </div>
        </div>
    )
}

export default Add_todo;
