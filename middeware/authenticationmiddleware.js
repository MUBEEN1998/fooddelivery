import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

export const checktoken=async(req,res,next)=>{
    try{
        const usertoken=req.headers['authorization'];
        const token=usertoken && usertoken.split(' ')[1];
        console.log(token,'vvvvvvvvvvvvvvvvv')

        
        if(token === null){
            return res.status(401).json({message:"token is incorrect"})

        }
    
            const verifytoken=jwt.verify(token,process.env.ACCESS_TOKEN,(err,response)=>{
                if(err)
                    return res.status(403)
                res.local  =response;
                next();
                
            })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"somthig wrong in token access"})
    }
}

export const checkrole=async(req,res,next)=>{
        try{
            if(res.local.role=process.env.USER){
                return res.status(401)
            }else{
                next()
            }

        }catch(error){
            console.log(error)
        }
}