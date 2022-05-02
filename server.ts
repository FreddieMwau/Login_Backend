// import express = require('express') 
import express from 'express'
import sqlConfig from './config/config'
import mssql from 'mssql'
import router from './Routes/userRoute'
const app = express()
app.use(express.json())
app.use('/user', router)
app.listen(7000, ()=> {
    console.log("=====> Servers launched  port 7000");
})

// Database connection
const checkConnection =async () => {
    try{
        const x = await mssql.connect(sqlConfig)
        if(x.connected){
            console.log("Database connected successfully");            
        }
    } catch(error:any){
        console.log(error.message);
        
    }
}
checkConnection()