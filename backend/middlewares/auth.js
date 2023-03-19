const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next)=>{
        const {token} = req.cookies;
        if(!token){
            return next(new ErrorHander("Please login to access this resource",401));
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await db.User.findById(decodedData.id);
        next();
});