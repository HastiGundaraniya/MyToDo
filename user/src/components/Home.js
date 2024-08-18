import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import log from '../todo2.jpg';

function Home() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/addtodo/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);

    async function handleDelete(todoId) {
        try {
            await axios.delete(`http://localhost:5000/addtodo/${todoId}`);
            setData(prevData => prevData.filter(todo => todo.id !== todoId));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    async function handleToggleDone(todoId, done) {
        try {
            await axios.put(`http://localhost:5000/addtodo/${todoId}/done`, { done: !done });
            setData(prevData =>
                prevData.map(todo =>
                    todo.id === todoId ? { ...todo, done: !todo.done } : todo
                )
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <div>
            <Link to='/' className="btn btn-primary logout">Log Out</Link>
            <div className="d-flex justify-content-center align-items-center">
                <div className="container pt-5 pb-5 d-flex justify-content-evenly box" style={{ position: 'relative', top: '-48px' }}>
                    <div>
                        <Link to={`/addtodo/${id}`} className='btn btn-primary mb-5'>Add To-Do Work</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan={3} className='text-primary'><h5>Your To-Do Work:</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((todo, index) => (
                                    <tr key={todo.id}>
                                        <td>{index + 1}</td>
                                        <td style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.todos}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => handleToggleDone(todo.id, todo.done)}>
                                                Done
                                            </button>
                                            <Link to={`/edit/${todo.id}`} className='btn ms-2' style={{ backgroundColor: "rgb(190 216 255)"}}>
                                                Edit
                                            </Link>
                                            <button className='btn ms-0'  onClick={() => handleDelete(todo.id)}>
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <img src={log} style={{ width: '50%', height: '50%' }} alt='img'></img>
                </div>
            </div>
        </div>
    );
}

export default Home;
