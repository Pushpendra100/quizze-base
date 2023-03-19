import React, { Fragment, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import MetaData from "../containers/MetaData";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createQuiz} from "../store/actions/quizActions";
import {Buffer} from "buffer";
import axios from "axios";


const CreateQuizPage = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {quiz, loading} = useSelector(state => state.createQuiz)
    const {isAuthenticated} = useSelector(state => state.user)


const [name, setName] = useState(""); 
const [field, setField] = useState(""); 
const [about, setAbout] = useState(""); 
const [finalTime, setFinalTime] = useState("");
const [timeLimit, setTimeLimit] = useState("");

const [statusOption, setStatusOption] = useState("public")
const [teamsAllowedOption, setTeamsAllowedOption] = useState(true)
const status = [
    {
      text:"Public",value:"public",
  
  },
  {
    text:"Private",value:"private"
  }
];
const teamsAllowed = [
    {
      text:"Yes",value:true,
  
  },
  {
    text:"No",value:false
  }
];

const [image, setImage] = useState();
const [isDone, setIsDone] = useState(false);
const api = "https://api.dicebear.com/5.x/identicon/svg?seed=";

useEffect(() => {
const getAvatars = async()=>{
    const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
    const buffer = new Buffer(image.data);
    const data = buffer.toString("base64");
    setImage(data);
    setIsDone(true);
}
getAvatars();
}, []);

var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var localDatetime = year + "-" +
                      (month < 10 ? "0" + month.toString() : month) + "-" +
                      (day < 10 ? "0" + day.toString() : day) + "T" +
                      (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                      (minute < 10 ? "0" + minute.toString() : minute);

const handleStatus = (e)=>{
    setStatusOption(e.target.value)
};
const handleTeamAllowed = (e)=>{
    setTeamsAllowedOption(e.target.value)
};
const handleFinalTime = (e) =>{
    setFinalTime(e.target.value)
}
const handleTimeLimit = (e) =>{
    setTimeLimit(e.target.value)
}

const handleSubmit = (e) =>{
    e.preventDefault();
    const quizDetails = {
        name,
        field,
        about,
        finalTime:Date.parse(finalTime),
        timeLimit:timeLimit,
        teamsAllowed:teamsAllowedOption,
        status:statusOption,
        image
    }
    dispatch(createQuiz(quizDetails));
}

useEffect(() => {
    if(!isAuthenticated){
        navigate(`/${params.username}/profile`)
    }
    quiz && navigate(`/${params.username}/create-quiz2/${quiz._id}`)
}, [quiz])


    

  return (
    <Fragment>
        <MetaData title="Quizze | Login" />
        <div className="createQuizPage">
            <div className="createQuizBox">
                <div className="closeBtn">
                    <Link to='/' className='closeBtnLink'><CloseIcon fontSize='large'/></Link>
                </div>
                <div className="cqHeading">
                    <h1>Create Quiz</h1>
                    <span>* * * * * * * * </span>
                </div>
                <div className="cqSection">
                    <form className='cqSectionForm'>
                        <div>
                            <label htmlFor="">Full name<span>*</span></label>
                            <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="">Field<span>*</span></label>
                            <input type="text" placeholder='eg. Science' value={field} onChange={(e)=>setField(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Time Limit<span>*</span></label>
                            <input type="time" placeholder='Name' value={timeLimit} onChange={handleTimeLimit}/>
                        </div>
                        <div>
                            <label htmlFor="finalTime">Ending on<span>*</span></label>
                            <input type="datetime-local" min={localDatetime}  id='finalTime' value={finalTime} onChange={handleFinalTime}/>
                        </div>
                        <div className='cqSectionFormRadioBox'>
                            <label htmlFor="view">Set status :</label>
                            {
                            status.map((option,index)=>(
                                <Fragment  key={index}>
                                <label>
                                <input type="radio" name="view" value={option.value} checked={statusOption===option.value} onChange={handleStatus}/>
                                {option.text}
                                </label>
                                </Fragment> 
                            ))
                            }
                        </div>
                        <div className='cqSectionFormRadioBox'>
                            <label htmlFor="teamsAllowed">Teams Allowed ?</label>
                            {
                            teamsAllowed.map((option,index)=>(
                                <Fragment  key={index}>
                                <label>
                                <input type="radio" name="teamsAllowed" value={option.value} checked={teamsAllowedOption===option.value} onChange={handleTeamAllowed}/>
                                {option.text}
                                </label>
                                </Fragment> 
                            ))
                            }
                        </div>
                        <div className='cqSectionFormFinalBox'>
                            <label htmlFor="quizAbout">About<span>*</span></label>
                            <textarea name="comment" placeholder='Comment' id="quizAbout" cols="30" rows="6" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
                            <input type="submit" value="Submit" onClick={handleSubmit} disabled={!isDone}/>
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default CreateQuizPage;