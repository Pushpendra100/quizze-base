const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    options:[String],
    type:{
        type:String,
        required:true,
    },
    correctAns:[{
        type:String,
    }],
    points:Number,
});

const givenUserSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    score:Number,
    attemptedOn:{
        type:Date,
        default:Date.now
    }
})

const quizSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name of quiz"],
        maxlength:[30,"name of quiz cannot exceed 30 characters"],
        minlength:[4,"name of quiz should have minimum 4 characters"]
    },
    field:{
        type:String,
        required:[true,"Please enter the field of quiz"],
        maxlength:[30,"field cannot exceed 30 characters"],
        minlength:[4,"field should have minimum 4 characters"]
    },
    about:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    editMode:{
        type:Boolean,
        default:true
    },
    timeLimit:String,
    createdTime:{
        type:Date,
        default:Date.now
    },
    finalTime:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true
    },
    teamsAllowed:{
        type:Boolean,
        required:true
    },
    questions:[questionSchema],
    totalPoints:Number,
    givenUsers:{
        type:[givenUserSchema],
        default:[]
    },
    totalParticipants:{
        type:Number,
        default:0
    },
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
    }
});



module.exports = mongoose.model("Quiz",quizSchema);