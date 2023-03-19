const mongoose = require("mongoose");


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


const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"Please enter your Username"],
        maxlength:[30,"Username cannot exceed 30 characters"],
        minlength:[4,"Username should have minimum 4 characters"]
    },
    members:[{
        username:String,
        role:String,
        avatar:String
    }],
    image:{
        type:String,
        default:""
    },
    quizGiven:[givenQuizSchema],
    createdOn:{
        type:Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

});


module.exports = mongoose.model("Team",teamSchema);