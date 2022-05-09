import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
interface RequestExtended extends Request {
    users?: any
}

export const verifyToken = (req: RequestExtended, res: Response, next: NextFunction) => {

    // try{

    const token = req.headers['token'] as string
    if (!token) {
        return res.json({ error: 'Not authorized to access this route.... no token found' })
    }

    try {
        let decodeToken
        decodeToken = <JwtPayload>jwt.verify(token, process.env.SECRET_KEY as string)
        // req.users = decodeToken
        req.body.users = decodeToken
    } catch (error) {
        return res.json({ error: 'Invalid token was provided' })
    }
    next()
}