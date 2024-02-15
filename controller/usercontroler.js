import { query } from "express";
import connection from "../connection.js";

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


