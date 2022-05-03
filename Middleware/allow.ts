import { RequestHandler } from "express";

// creates and manages JWT
export const Allow :RequestHandler = (req, res, next) => {
    // first we protect a route without using tokens
    const token = req.headers['token']
    if(!token){
        console.log("======>" + token);
        
        return res.json({error: 'Not authorized to access this route'})
    }
    next()
}