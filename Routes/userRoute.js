"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const verify_1 = require("../Middleware/verify");
const router = express_1.default.Router();
router.post('/create', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get('/', userController_1.getUsers);
router.get('/home', verify_1.verifyToken, userController_1.homepage);
router.get('/:email', userController_1.getUserByUsername);
router.put('/:id', userController_1.updateUser);
router.patch('/:id', userController_1.resetPassword);
router.delete('/:id', verify_1.verifyToken, userController_1.deleteUser);
// router.get('/dashBoard', dashBoard )
exports.default = router;
