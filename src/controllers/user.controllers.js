import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import { User as u } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req, res) => {
    //getting user details from frontend
    const { fullName, email, username, password } = req.body
    console.log("email: ", email);
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
            throw new ApiError(400,"all fields are required");
    }
    const existedUser=u.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"username or email already exist");
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) throw new ApiError(400,"AVATAR file is required")
    
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);
      if(!avatar)  throw new ApiError(400,"AVATAR  is required")
    
        const user= await u.create({
            fullName,
            avatar:avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()
        })
        const createdUser=await u.findById(user._id).select(
            "-password -refreshToken"
        )
        if(!createdUser){
            throw new ApiError(500,"something went wrong while registring user ")
        }
        return res.status(201).json(
            new ApiResponse(200,createdUser,"User registered succesfully")
        )
});
 



export { registerUser } 