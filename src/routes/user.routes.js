import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router();

router.route("/register").post(

    //at the time of registration we are 
    //injecting upload middleware for 
    //accepting image and avatar
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
); 

export default router;