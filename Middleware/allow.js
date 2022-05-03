"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allow = void 0;
// creates and manages JWT
const Allow = (req, res, next) => {
    // first we protect a route without using tokens
    const token = req.headers['token'];
    if (!token) {
        console.log("======>" + token);
        return res.json({ error: 'Not authorized to access this route' });
    }
    next();
};
exports.Allow = Allow;
