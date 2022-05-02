"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
// Validator so all inputs have values
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required().min(8).max(30) // minimun characters 8 and max of 30
});
