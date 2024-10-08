const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const shopSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter shop name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter shop email!"],
    validate: {
        validator:validator.isEmail,
        message:"please enter a valid email",
    }
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  address:{
    type: String,
    required: true,
  },
  phoneNumber:{
    type: Number,
    required: true,
  },
  role:{
    type: String,
    default: "seller",
  },
  zipCode: {
    type: Number,
    required: true,
  },
  avatar:{
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    }
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 },
 description:{
    type: String,
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
});


//  Hash password
shopSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);