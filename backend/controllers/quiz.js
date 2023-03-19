const db = require("../models");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

exports.createQuiz1 = catchAsyncErrors(async(req, res, next) =>{

    const quizDetails = req.body;
    const user = req.user;

    const quiz = await db.Quiz.create({   
        ...quizDetails, user
    });
    user.quizCreated.push(quiz._id);
    await user.save();

    const createdQuiz = await db.Quiz.findById(quiz.id).populate('user',['username','id']);

    res.status(201).json(createdQuiz);

});

exports.addQuestions = catchAsyncErrors(async(req, res, next) =>{
    const questions = req.body;
    const {id} = req.params
    const quiz = await db.Quiz.findById(id);
    quiz.questions = questions;
    await quiz.save();


    res.status(200).json(quiz);

});
exports.addAns = catchAsyncErrors(async(req, res, next) =>{
    const {questions, totalPoints} = req.body;
    const {id} = req.params

    const quiz = await db.Quiz.findById(id);
    quiz.totalPoints = totalPoints;
    quiz.questions = questions;
    quiz.editMode = false;
    await quiz.save();


    res.status(200).json({})

});
exports.getQuizDetails = catchAsyncErrors(async(req, res, next) =>{
    const {id} = req.params;

    const quiz = await db.Quiz.findById(id,{questions:0});


    res.status(200).json(quiz);

});
exports.getQuiz = catchAsyncErrors(async(req, res, next) =>{
    const {id} = req.params;

    const quiz = await db.Quiz.findById(id)
    quiz.questions.forEach(question => {
        question.correctAns = undefined;
    });

    res.status(200).json(quiz);

});
exports.getQuizzesInfo =catchAsyncErrors(async (req, res, next)=>{
    const createdQuizzes = await db.Quiz.find({user:req.params.id, editMode:false},{questions:0, image:0})
    const givenQuizzes = await db.Quiz.find({"givenUsers.user":req.params.id},{questions:0, image:0})
    const quizzes = {
        createdQuizzes,
        givenQuizzes:givenQuizzes,
        starredQuizzes:[],
    }
    res.status(200).json({
        success:true,
        quizzes
    })
});
