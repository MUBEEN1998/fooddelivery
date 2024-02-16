import { query } from "express";
import connection from "../connection.js";
import jwt from "jsonwebtoken";

export const usersignup = (req, res) => {
    let user = req.body;
    let query = "SELECT * FROM users WHERE email=?";
    connection.query(query, [user.email], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length <= 0) {
            query = "INSERT INTO users (name, contact_number, email, password, status, role) VALUES (?, ?, ?, ?, ?, ?)";
            connection.query(query, [user.name, user.contact_number, user.email, user.password, user.status, user.role], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: "Error inserting user" });
                }
                return res.status(200).json({ message: "User created successfully" });
            });
        } else {
            return res.status(400).json({ message: "Email already exists" });
        }
    });
};


// export const login = (req, res) => {
//     const { email } = req.body;
//     const query = "SELECT * FROM users WHERE email=?";
//     connection.query(query, [email], (err, result) => {
//         if (!err) {
//             if(result.length <=0 || result[0].password !=password){
//                 return res.status(401).json({message:"incorret useremail or password"})
//             }
//         } else {
//             if (result.length > 0) {
//                 const user = result[0];
//                 const token = jwt.sign({ email: user.email, id: user.id }, 'secretkey', { expiresIn: '1h' });
//                 res.status(200).json({ message: "Login successful", token: token });
//             } else {
//                 res.status(404).json({ message: "User not found" });
//             }module.exports = login;

// };