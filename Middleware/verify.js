"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.json({ error: 'Not authorized to access this route.... no token found' });
    }
    try {
        // if(token === token){
        // return res.json({ error: 'Invalid token was provided first' })
        // console.log("REached here");
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!decodeToken) {
            return res.json({ error: 'Invalid token was provided' });
        }
        req.users = decodeToken;
        console.log("============>" + req.body.users.recordset[0].fullname);
        //     console.log("Decoded token ==========>" + token);
        // // }
    }
    catch (error) {
        // return res.json({ error: 'Invalid token was provided' })
    }
    next();
};
exports.verifyToken = verifyToken;
