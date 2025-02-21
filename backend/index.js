const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'user'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.post('/data', (req, res) => {
    const { name, email, pass } = req.body;
    const query = 'INSERT INTO signup (name, email, pass) VALUES (?, ?, ?)';
    db.query(query, [name, email, pass], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
        } else {
            res.json(result);
        }
    });
});



app.post('/login', (req, res) => {
    const { email, pass } = req.body;
    const query = 'SELECT id FROM signup WHERE email = ? AND pass = ?';
    db.query(query, [email, pass], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.json({status: 'success' , id: result[0] });
            } else {
                res.json({ status: 'fail' });
            }
        }
    });
});


app.post('/addtodo/:id', (req, res) => {
    const l_id = req.params.id;
    const { todo } = req.body;
    const query = "INSERT INTO todos (login_id, todos) VALUES (?, ?)";
    db.query(query, [l_id, todo], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
        } else {
            res.json({ insertId: result.insertId }); // Returning the insertId to the frontend
        }
    });
});


app.get('/addtodo/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM todos WHERE login_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
});

app.put('/addtodo/:id/done', async (req, res) => {
    const todoId = req.params.id;
    const { done } = req.body;
    try {
        db.query('UPDATE todos SET done = ? WHERE id = ?', [done, todoId]);
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/addtodo/:todoId', (req, res) => {
    const todoId = req.params.todoId; // Corrected to use req.params.todoId directly
    const query = 'DELETE FROM todos WHERE id = ?';

    db.query(query, [todoId], (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            res.status(500).json({ error: 'Error deleting todo' });
            return;
        }
        console.log('Deleted todo with id:', todoId);
        res.sendStatus(200); // Send status OK
    });
});

//edit
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM todos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Failed to fetch todo data:', err);
            return res.status(500).json({ Error: err.message });
        }
        console.log('todo data fetched successfully:', result);
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const todos = req.body;
    const query = 'UPDATE todos SET todos = ?  WHERE id = ?';
    db.query(query, [todos, id], (err, result) => {
        if (err) {
            console.error('Failed to update todo:', err);
            return res.status(500).json({ Error: err.message });
        }
        return res.json({ Success: 'todo updated successfully', result });
    });
});


// app.put('/edit/:id', (req,res) => {
//     const id = req.params;
//     const todos = req.body;
//     const query = 'UPDATE todos SET todos = ? WHERE id = ?';
//     db.query(query, [id, todos], (err, result) => {
//         if(err){
//             console.error('error updating data', err);
//         }
//         else{
//             console.log('updated successfully')
//         }
//     })
// })


// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aagubagu12@gmail.com',
        pass: 'xyz'
    }
});

// Forgot Password Endpoint
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');

    db.query('SELECT * FROM signup WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Error fetching data' });
        } 
        if (result.length === 0) {
            return res.status(404).json({ message: 'Email not found' });
        } 
        if (result.length !== 0){
        db.query('UPDATE signup SET reset_password_token = ? WHERE email = ?', [token, email], (err) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ error: 'Error updating data' });
            } 

            const resetLink = `http://localhost:3000/reset-password/${token}`;
            const mailOptions = {
                from: 'aagubagu12@gmail.com',
                to: email,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process:\n\n
                       ${resetLink}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error('Error sending email:', err);
                    return res.status(500).json({ error: 'Error sending email' });
                } 
                res.json({ message: 'Password reset link sent' });
            });
        });
    }
    });
});

// Reset Password Endpoint
app.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;

    db.query('SELECT * FROM signup WHERE reset_password_token = ?', [token], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Error fetching data' });
        } 
        if (result.length === 0) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        } 
        
        db.query('UPDATE signup SET pass = ?, reset_password_token = NULL WHERE reset_password_token = ?', [newPassword, token], (err) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ error: 'Error updating data' });
            } 
            res.json({ message: 'Password has been reset' });
        });
    });
});


app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
