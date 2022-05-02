"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express = require('express') 
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const mssql_1 = __importDefault(require("mssql"));
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', userRoute_1.default);
app.listen(7000, () => {
    console.log("=====> Servers launched  port 7000");
});
// Database connection
const checkConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const x = yield mssql_1.default.connect(config_1.default);
        if (x.connected) {
            console.log("Database connected successfully");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
checkConnection();
