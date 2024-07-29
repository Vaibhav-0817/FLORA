const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");
const User = require('../model/user')
const asyncError = require("./asyncError");

exports.isAuthenticated = asyncError(async (req,res,next)=>{
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue",401));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
})

exports.isSeller = asyncError(async (req,res,next)=>{
    const { seller_token } = req.cookies;

    if(!seller_token){
        return next(new ErrorHandler("Please login to continue",401));
    }
    const decoded = jwt.verify(seller_token,process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);
    next();
})