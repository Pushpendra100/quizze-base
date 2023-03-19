const db = require("../models");
const sendToken = require("../utils/jwtToken");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")


exports.registerUser = catchAsyncErrors(async(req, res, next) =>{

    const {username, name, email, password} = req.body.user;
    const avatar = req.body.avatar;
    const user = await db.User.create({   
        username,name,email,password, avatar
    });


    sendToken(user,201,res);

});

exports.loginUser = catchAsyncErrors(async(req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHander("Please Enter & Password",400));
    }

    const user = await db.User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401))
    };

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401))
    }

    sendToken(user,200,res);

});
exports.logoutUser = catchAsyncErrors(async(req, res, next) =>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true 
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

exports.getUserDetails =catchAsyncErrors(async (req, res, next)=>{
    const user = await db.User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
});

exports.getUsers =catchAsyncErrors(async (req, res, next)=>{
    const users = await db.User.find({},{username:1, _id:0});
    res.status(200).json({
        success:true,
        users
    })
});

exports.deleteHalfQuizes =catchAsyncErrors(async (req, res, next)=>{
    const quizes = await db.Quiz.deleteMany({user:req.params.id, editMode:true})
    res.status(200).json({
        success:true,
        quizes
    })
});

exports.userQuizSubmit =catchAsyncErrors(async (req, res, next)=>{
// correctAns length should not be zero
    const {userId, responses} = req.body;
    const {quizId} = req.params;
    const user = await db.User.findById(userId,{avatar:0});
    const quiz = await db.Quiz.findById(quizId,{questions:1,givenUsers:1,totalParticipants:1})
    let result = [];
    let score = 0;    

    quiz.questions.forEach((question,index) => {
        let count = 0;
        if(question.correctAns.length!== responses[index]?.length){
                result[index] = false;
        }else{
            for(let i = 0; i<question.correctAns.length; i++){
                let isContain = responses[index].includes(question.correctAns[i]);
                if(!isContain){
                    result[index] = false;
                    if(count == 1) score -= question.points;
                    break;
                }
                result[index] = true;
                if(count<1){
                    score += question.points;
                    count++;
                }
            }
        }
    });

    const givenQuiz = {
        quiz: quizId,
        responses,
        responseResult:result,
        score
    }        

    user.quizGiven.push(givenQuiz)
    await user.save();

    quiz.givenUsers = [
        ...quiz.givenUsers,
        {
            user: userId,
            score,
        }
    ]
    
    quiz.totalParticipants += 1;

    await quiz.save();


    res.status(200).json({
        success:true,
        user,
        quiz
    })
});

