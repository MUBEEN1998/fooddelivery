import { query } from "express";
import connection from "../connection.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

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




export const login = (req, res) => {
    const { email, password } = req.body;

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


let transporter_email=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})


export const  forgotpassword=async(req,res)=>{

    const user=await req.body;
    const query="select email,password from users where email=?"
    connection.query(query,[user.email],(err,result)=>{
        if(!err){
            if(result.length <=0){
            return res.status(200).json({message:"your email is incorrect "})
                
            }else{
                const mailoption={
                    from:process.env.EMAIL,
                    to:result[0].email,
                    subject:"password by dafe management system",
                    html:'<p><b> your login details for cafe management system </b><br><b>Email:</b></p>'+result[0].email+'<br><b>password:'+result[0].password+'=</b></p>'
                }
                transporter_email.sendMail(mailoption,function(err,info){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('email sent :'+info.response)
                    }
                })
            return res.status(200).json({message:"password sent successfull to your email "})
                
                

            }

        }else{
            return res.status(500).json(err)
        }
    })

}

export const usersInformation = async (req, res) => {
    try {
        const query = "SELECT * FROM users WHERE role = ?";
        connection.query(query, ['user'], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (result && result.length > 0) {
                return res.status(200).json({ users: result });
            } else {
                return res.status(404).json({ message: "No users found" });
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};





