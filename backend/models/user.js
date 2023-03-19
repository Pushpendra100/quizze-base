const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const userTeamsSchema = new mongoose.Schema({
    team:{type: mongoose.Schema.Types.ObjectId, ref:"Team"},
    image:{
        type:String,
        default:""
    },
    name:String
});
const givenQuizSchema = new mongoose.Schema({
    quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    },
    responses:[[String]],
    responseResult:[Boolean],
    score:{
        type:Number,
    },
});


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Please enter your Username"],
        maxlength:[30,"Username cannot exceed 30 characters"],
        minlength:[4,"Username should have minimum 4 characters"]
    },
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have minimum 4 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please enter your email"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[8,"password should have minimum 8 characters"],
        select:false
    },
    quizCreated:[{type: mongoose.Schema.Types.ObjectId, ref:"Quiz"}],
    quizGiven:[givenQuizSchema],
    quizStarred:[{type: mongoose.Schema.Types.ObjectId, ref:"Quiz"}],
    teams:[{
        type:userTeamsSchema,
        default:[],
    }],
    created:{
        type:Date,
        default: Date.now
    },
    avatar:{
        type:String,
        default:""
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,12);
});

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRE
    })
};

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User",userSchema);