const db = require("../models");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

exports.createTeam =catchAsyncErrors(async (req, res, next)=>{
    const {userId} = req.params;
    const teamInfo = req.body
    const user = await db.User.findById(userId);
    let actualMemList = [...teamInfo.members];

    for(let i = 0; i<teamInfo.members.length;i++){
        const mem = await db.User.findOne({username:teamInfo.members[i].username});
        actualMemList[i].avatar = mem.avatar;
    }

    const team  = await db.Team.create({
        ...teamInfo, members:actualMemList ,user
    })

    for(let i = 0; i<team.members.length;i++){
        const mem = await db.User.findOne({username:team.members[i].username});
        mem.teams.push({
            team:team.id,
            image:team.image,
            name:team.name
        });
        await mem.save();
    }

    res.status(200).json({
        success:true,
        team:team._id
    })
});

exports.getTeam =catchAsyncErrors(async (req, res, next)=>{
    const {teamId} = req.params;
    const team = await db.Team.findById(teamId);
    res.status(200).json({
        success:true,
        team
    })
});
exports.getUserTeams =catchAsyncErrors(async (req, res, next)=>{
    const user = await db.User.findById(req.params.userId)
    // const teams = await db.Team.find({user:req.params.userId},{name:1,image:1,_id:1});
    res.status(200).json({
        success:true,
        teams:user.teams
    })
});
exports.getAllTeams =catchAsyncErrors(async (req, res, next)=>{
    const teams = await db.Team.find({},{name:1, _id:0});
    res.status(200).json({
        success:true,
        teams
    })
});
exports.getAllTeamsInfo =catchAsyncErrors(async (req, res, next)=>{
    const teams = await db.Team.find({},{name:1,members:1});
    res.status(200).json({
        success:true,
        teams
    })
});