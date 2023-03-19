import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import {quizAddQuestions, getQuiz} from "../store/actions/quizActions"

import test from "../assets/test.jpg";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';

const CreateQuizPage2 = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {quiz,loading} = useSelector(state => state.createQuiz);
    const {isAuthenticated} = useSelector(state => state.user)


    const [questions, setQuestions] = useState([
        {
            question:"",
            type:'mcq',
            options:[""]
        }
    ]);




    function handleQuestionValueChange(e,i){
        let newArr = [...questions];
        newArr[i].question = e.target.value;
        setQuestions([...newArr]);


        const textarea = document.querySelector("textarea");

        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`; 
    }
    const handleSelectValueChange = (e,i) =>{
        let newArr = [...questions];
        newArr[i].type = e.target.value;
        setQuestions([...newArr])
    }
    const handleOptionValueChange = (e,i,i1) =>{
        let newArr = [...questions];
        newArr[i].options[i1] = e.target.value;
        setQuestions([...newArr])
    }

    const handleAddOption = (e,i) =>{
        let newArr = [...questions];
        newArr[i].options.push("");
        setQuestions([...newArr])
    }
    const handleRemoveOption = (e,i,i1) =>{
        let newArr = [...questions];
        newArr[i].options.splice(i1,1)
        setQuestions([...newArr])
    }
    const handleDuplicate = (e,i) =>{
        let newArr = [...questions];
        let question = {
            question:questions[i].question,
            type:questions[i].type,
            options:[...questions[i].options]
        };
        newArr.splice(i+1,0,question)
        setQuestions([...newArr])
    }
    const handleDelete = (e,i) =>{
        let newArr = [...questions];
        newArr.splice(i,1)
        setQuestions([...newArr])
    }

    const handleAddQuestion = () =>{
        let newArr = [...questions];
        let newQuestion = {
                question:"",
                type:'mcq',
                options:[""]
        }
        newArr.push(newQuestion)
        setQuestions([...newArr])
        console.log(questions);
    }

    const handleOnDragEnd = (result) =>{
        const qs = Array.from(questions);
        const [reorderedItem] = qs.splice(result.source.index, 1);
        qs.splice(result.destination.index, 0, reorderedItem);

        setQuestions(qs);
        console.log(qs);
    }


    const handleSubmit = () =>{
        dispatch(quizAddQuestions({questions,quiz:quiz._id}))
        navigate(`/${params.username}/create-quiz3/${params.id}`)
    }
    
    useEffect(() => {
        if(!isAuthenticated){
            navigate(`/${params.username}/profile`)
        }

    }, [])
    
    

  return (
    <>
        {
            !loading && (
                <div className='cq2Page'>
                    <div className="cq2Intro">
                        <div className="cq2IntroSec1">
                            <div className="cq2IntroImgContainer">
                                <img src={`data:image/svg+xml;base64, ${quiz.image}`} alt="quiz image" />
                            </div>
                        </div>
                        <div className="cq2IntroSec2">
                            <h1>{quiz && quiz.name}</h1>
                            <h4>{quiz && quiz.field}</h4>
                            <button className="cq2Btn" onClick={handleSubmit}>Done</button>
                        </div>
                    </div>
                    <div className="cq2Details">
                        <span>Description : </span>
                        {quiz && quiz.about}
                    </div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="dropQuestionsBox">
                        {
                            (provided) => (
                                <div className="cq2QuestionsSection" {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            questions.map((question,idx) => {
                                                return (
                                                    <Draggable  key={idx} draggableId={`${idx}`} index={idx}>
                                                    {
                                                        (provided)=>(
                                                            <div className="cq2QuestionBox" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <div className="cq2-qb-sec1">
                                                                    <MoreHorizIcon className='cq2-qb-drag-icon '/>
                                                                </div>
                                                                <div className="cq2-qb-sec2">
                                                                    <textarea name="question" cols="40" rows="1" placeholder='Question' value={question.question} onChange={(e)=>handleQuestionValueChange(e,idx)}></textarea>
                                                                    <ImageIcon className='cPointer cq2-qb-sec2Icons'/>
                                                                    <CodeIcon className='cPointer cq2-qb-sec2Icons'/>
                                                                    <div className="cq2-qb-sec2-selectBox">
                                                                        <select name="" id="" className='cq2-qb-sec2-selectBox-select' value={question.type} onChange={(e)=>handleSelectValueChange(e,idx)}>
                                                                            <option value="mcq">MCQ</option>
                                                                            <option value="scq">SCQ</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="cq2-qb-sec3">
                                                                    <div className="cq2-ot-Checkbox">
                                                                        {
                                                                            question.options.map((option,index)=>{
                                                                                return(
                                                                                        <div className="cq2-ot-checkbox-options" key={index}>
                                                                                            <div className="cq2-ot-checkbox-options-hold"><MoreVertIcon className='cq2-qb-drag-icon'/></div>
                                                                                            <input type={question.type ==="mcq"?"checkbox":"radio"} disabled />
                                                                                            <input type="text" placeholder='Option' value={option} onChange={(e)=>handleOptionValueChange(e,idx,index)} />
                                                                                            <CloseIcon className='cq2-qb-option-del' onClick={(e)=>handleRemoveOption(e,idx,index)}/>
                                                                                        </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        <div className="cq2-ot-checkbox-options-add" onClick={(e)=>handleAddOption(e,idx)}>Add option <AddIcon/></div>
                                                                    </div>
                                                                </div>
                                                                <div className="cq2-qb-sec4">
                                                                    <ContentCopyIcon className='cPointer' onClick={(e)=>handleDuplicate(e,idx)}/>
                                                                    <DeleteIcon className='cPointer' onClick={(e)=>handleDelete(e,idx)}/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    </Draggable>
                                                )
                                            })
                                        }
                                        {provided.placeholder}
                                    <button className="cq2AddQuestionBtn" onClick={handleAddQuestion}>Add <AddIcon/></button>
                                </div>
                            )
                        }
                        </Droppable>
                    </DragDropContext>
                </div>
            )
        }
    </>

  )
}

export default CreateQuizPage2