
import  dotenv  from 'dotenv';
import connectDB from './db/index.js'
dotenv.config({
    path:'./env'
})
connectDB();
/*
import exprees from 'express'
const app=exprees()
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("errror",(error)=>{
            console.log("error connecting to db",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.log("Eroor in connceting db",error);
        throw error;   
    }
})()

*/