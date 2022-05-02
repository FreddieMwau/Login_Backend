import { v1 as uid } from 'uuid'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import bcrypt from 'bcrypt'
import { registerSchema } from '../Helpers/registrationValidator'
import { loginSchema } from '../Helpers/loginValidator'

// Creates a new user
export const createUser = async (req: Request, res:Response, next:NextFunction) => {
    try{
        const id = uid()
        const{fullname, email, password} = req.body as  {fullname:string, email: string, password:string}
        // creates a connection
        let pool = await mssql.connect(sqlConfig)
        // validation using Joi
        // helps not have incomplete data in our db as the endpoint stops running after encountering the error
        const {error} = registerSchema.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }
        // calling the storedProcedure

        // takes the value to be hashed and a salt rounds to run the value^salt to get the hashed pssword
        const hashedPassword = await bcrypt.hash(password, 15)
        await pool.request()
        .input('id', mssql.VarChar, id)
        .input('fullname', mssql.VarChar, fullname)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, hashedPassword)
        .execute('createUser')
        res.status(200).json({ "message": 'User created successfully' });
    } catch(error: any){
        res.json({error: error.message})
    }
}

// Gets all users in the Db
export const getUsers: RequestHandler = async (req, res, next) => {
    try{
        let pool = await mssql.connect(sqlConfig)
        const users = await pool.request()
        .execute('getUser')
        res.json(users.recordset)
    } catch (error: any) {
        res.json({error: error.message})
    }
}

// Gets user by email address
export const getUserByUsername: RequestHandler<{email:string}> = async (req, res, next) => {
    try{
        const email = req.params.email
        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('email', mssql.VarChar, email)
        .execute('getUsersByUserName')
        if(!user.recordset[0]){ //accessing the first record set
            return res.json({message: `User with username : ${email} does not exist`})
        }
        return res.json(user.recordset)
    } catch (error : any){
        res.json({ error: error.message })
    }
}

// Updates user by id
export const updateUser: RequestHandler<{id:string}> = async (req, res) =>{
    try{
        const id = req.params.id
        let pool = await mssql.connect(sqlConfig)
        const { fullname, email } = req.body as { fullname: string, email: string }
        const user = await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('getUserById')
        if (!user.recordset[0]) { //accessing the first record set
            return res.json({ message: `User with id : ${id} does not exist` })
        }

        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('fullname', mssql.VarChar, fullname)
            .input('email', mssql.VarChar, email)
            .execute('updateUser')

        res.json({message: "User updated successfully"})
    } catch (error: any){
        res.json({error: error.message})
    }
}

// Deletes user by id
export const deleteUser : RequestHandler<{ id: string }> = async (req, res) => {
    try{
        const id = req.params.id
        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('getUserById')
        if (!user.recordset[0]) { //accessing the first record set
            return res.json({ message: `User with id : ${id} does not exist` })
        }
        await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('deleteUsers')
        res.json({ message: "User deleted successfully" })
    } catch(error: any){
        res.json({ error: error.message })
    }
}

// Login User to Platform
export const loginUser : RequestHandler = async(req, res) => {
    try {
        let pool = await mssql.connect(sqlConfig)
        const { email, password } = req.body as { email: string, password: string }
        const { error } = loginSchema.validate(req.body)
        // Validating the login
        if (error) {
            return res.json({error: error.details[0].message})
        }
        const user = await pool.request()
        .query(`
            SELECT fullname,email,password from Users
            WHERE email='${email}'
        `)

        const validatePassword = await bcrypt.compare(password, user.recordset[0].password)

        if (!validatePassword) {
            return res.json({ message: "Invalid credentials." })
        }
        // restrics diplaying the password in the response
        const data = user.recordset.map(record => {
            const{password, ...rest} =  record
            return rest
        })
        res.json({message:"Logged in successfully",
            data})
    } catch (error:any){
        res.json({ error: error.message })
    }
}