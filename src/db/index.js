import mongoose, { mongo, MongooseError } from 'mongoose'
import { DB_NAME } from '../constants.js/'

const connectDB=async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("sucessfully connceted to db");

        
    } catch (error) {
        console.log("error connecting to db",error);
        process.exit(1);
        
    }
}
export default connectDB;
