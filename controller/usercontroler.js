import { query } from "express";
import connection from "../connection.js";
import jwt from "jsonwebtoken";
import { message } from "@hapi/hawk/lib/client.js";

export const usersignup = (req, res) => {
    let user = req.body;
    let query = "SELECT * FROM users WHERE email=?";
    connection.query(query, [user.email], (error, results) => {


        if (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log(results,'hhhhhhhhhhhhhhhhhh')
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
//     const user = req.body;

//     const query = "SELECT * FROM users WHERE email=?";
//     connection.query(query, [user.email], (err, results) => {
//         console.log(results,'****************')

//         if(!err){

//             const response = { email: results[0].email, role: results[0].role };
//             const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
//             res.status(200).json({ token: accessToken }); 

//         }else if(results.length <= 0 || results[0].password != user.password){
//         return res.status(401).json({ message: "Incorrect email or password" });

//         }

//         // if (err) {
//         //     console.error("Error executing query:", err);
//         //     return res.status(500).json({ message: "Internal server error" });
//         // }
        
//         // if (results.length <= 0 || results[0].password != user.password) {
//         //     return res.status(401).json({ message: "Incorrect email or password" });
//         // } else if (results[0].status === "false") {
//         //     return res.status(401).json({ message: "Wait for admin approval" });
//         // } else {
//         //    
//         // }
//         res.status(200).json({results:results})
//     });
// };

export const login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, '*******************')

    const query = "SELECT * FROM users WHERE email=?";
    connection.query(query, [email], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.length <= 0 || result[0].password !== password) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        if (result[0].status === "false") {
            return res.status(401).json({ message: "Wait for admin approval" });
        }
        
        const response = { email: result[0].email, role: result[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        res.status(200).json({ token: accessToken });
    });
};







