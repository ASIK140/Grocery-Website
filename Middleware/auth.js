const catchAsyncError = require("./catchAsyncError")
const jwt = require("jsonwebtoken");
const Users = require("../Models/UserModel");
const ErrorHander = require("../Utils/ErrorHander");




// Check authorized user
exports.Auth = catchAsyncError ( async (req,res,next)=>{
    const { token} =req.cookies;
    if(!token){
        return next( new ErrorHander(401,"Please Login"))
    }    

    const deCodeData = jwt.verify(token,process.env.JWT_SECKEY)
    
    req.user=await Users.findById(deCodeData.id)
    next()
})

// Check authorized Admin

exports.checkAuthAdmin=(...roles)=>{
   return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(401,"This user can't access this source"))
        }
        next()
    }
}