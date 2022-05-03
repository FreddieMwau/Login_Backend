import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
interface RequestExtended extends Request{
    users?: any
}

export const verifyToken = (req: RequestExtended, res:Response, next:NextFunction)=> {
    try{
        const token = req.headers['token'] as string
        if(!token){
            return res.json({error: 'Not authorized to access this route.... no token found'})
        }
        // if(token === token){
            // return res.json({ error: 'Invalid token was provided first' })
            // console.log("REached here");
            
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY as string)
            req.users = decodeToken
            console.log("Decoded token ==========>" + token);

            console.log("============>" + req.body.users.recordset[0].fullname);
        // }
        
    } catch(error:any){
        return res.json({ error: 'Invalid token was provided' })
    }

    next()
}