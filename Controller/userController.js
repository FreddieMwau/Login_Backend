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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUserByUsername = exports.getUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registrationValidator_1 = require("../Helpers/registrationValidator");
const loginValidator_1 = require("../Helpers/loginValidator");
// Creates a new user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v1)();
        const { fullname, email, password } = req.body;
        // creates a connection
        let pool = yield mssql_1.default.connect(config_1.default);
        // validation using Joi
        // helps not have incomplete data in our db as the endpoint stops running after encountering the error
        const { error } = registrationValidator_1.registerSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        // calling the storedProcedure
        // takes the value to be hashed and a salt rounds to run the value^salt to get the hashed pssword
        const hashedPassword = yield bcrypt_1.default.hash(password, 15);
        yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('fullname', mssql_1.default.VarChar, fullname)
            .input('email', mssql_1.default.VarChar, email)
            .input('password', mssql_1.default.VarChar, hashedPassword)
            .execute('createUser');
        res.status(200).json({ "message": 'User created successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createUser = createUser;
// Gets all users in the Db
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const users = yield pool.request()
            .execute('getUser');
        res.json(users.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUsers = getUsers;
// Gets user by email address
const getUserByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool.request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getUsersByUserName');
        if (!user.recordset[0]) { //accessing the first record set
            return res.json({ message: `User with username : ${email} does not exist` });
        }
        return res.json(user.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUserByUsername = getUserByUsername;
// Updates user by id
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { fullname, email } = req.body;
        const user = yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getUserById');
        if (!user.recordset[0]) { //accessing the first record set
            return res.json({ message: `User with id : ${id} does not exist` });
        }
        yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('fullname', mssql_1.default.VarChar, fullname)
            .input('email', mssql_1.default.VarChar, email)
            .execute('updateUser');
        res.json({ message: "User updated successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.updateUser = updateUser;
// Deletes user by id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getUserById');
        if (!user.recordset[0]) { //accessing the first record set
            return res.json({ message: `User with id : ${id} does not exist` });
        }
        yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('deleteUsers');
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
// Login User to Platform
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const { email, password } = req.body;
        const { error } = loginValidator_1.loginSchema.validate(req.body);
        // Validating the login
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const user = yield pool.request()
            .query(`
            SELECT fullname,email,password from Users
            WHERE email='${email}'
        `);
        const validatePassword = yield bcrypt_1.default.compare(password, user.recordset[0].password);
        if (!validatePassword) {
            return res.json({ message: "Invalid credentials." });
        }
        // restrics diplaying the password in the response
        const data = user.recordset.map(record => {
            const { password } = record, rest = __rest(record, ["password"]);
            return rest;
        });
        res.json({ message: "Logged in successfully",
            data });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.loginUser = loginUser;
