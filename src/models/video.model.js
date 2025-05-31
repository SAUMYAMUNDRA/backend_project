import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new mongoose.Schema({
     isPublished:{
        type:Boolean,
        default:ture
     },
      videoFile:{
        type:String,
        required:true,
     },
      thumbnail:{
        type:String,
        required:true,
     },
      title:{
        type:String,//cloudinary url weell be using
        required:true,
     },
      description:{
        type:String,
        required:true,
     },
      duration:{
        type:Number,
        required:true,
      },
       password:{
        type:String,
        required:[true,"pass is req"],
     },
     views:{
        type:Number,
        default:0,

     },
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
     },

},{timestamps:true});
videoSchema.plugin(mongooseAggregatePaginate);


export const Video=mongoose.model("Video",videoSchema);