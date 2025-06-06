import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true,
        index:true,
        unique:true,
        lowercase:true,
        trim:true
     },
      email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
     },
      fullName:{
        type:String,
        required:true,
        index:true,
        trim:true
     },
      avatar:{
        type:String,//cloudinary url weell be using
        required:true,
     },
      coverImage:{
        type:String,
     },
      watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
      ],
       password:{
        type:String,
        required:[true,"pass is req"],
     },
     refreshToken:{
        type:String
     }
},{timestamps:true});
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
    next()
}
else{return next();}
})
userSchema.methods.isPasswordCorrect=async function(password) {
      return await bcrypt.compare(password,this.password);

}

userSchema.method.methods.generateAccessToken=function(){
   return jwt.sign({
      _id:this._id,
      email:this.email,
      username:this.username,
      fullName:this.fullName
   },
   process.env.ACCESS_TOKEN_SECRET,
   {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.method.methods.generateRefreshToken=function(){
    return jwt.sign({
      _id:this._id,
     
   },
   process.env.REFRESH_TOKEN_SECRET,
   {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)

}

export const User=mongoose.model("User",userSchema);