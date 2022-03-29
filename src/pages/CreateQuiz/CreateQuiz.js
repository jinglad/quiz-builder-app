import React, { useState, useEffect, useRef } from "react";
import "./CreateQuiz.css";
import UploadImage from "../../components/UploadModal/UploadModal";

import { BsTrash } from "react-icons/bs";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CloseIcon from "@mui/icons-material/Close";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import { BsFileText } from "react-icons/bs";
import { FcRightUp } from "react-icons/fc";

// import { useStateValue } from "./StateProvider";
// import { actionTypes } from "./reducer";
import { useParams } from "react-router";
import { Accordion } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { Switch } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import {
  SET_DOC_DESC,
  SET_DOC_NAME,
  SET_QUESTIONS,
  SET_QUIZES,
} from "../../Redux/types";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import Header from "../../components/Header/Header";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function CreateQuiz() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [documentName, setDocName] = useState("untitled Document");

  const [questionType, setType] = useState("checkbox");
  let { id } = useParams();

  const { quizs } = useSelector((state) => state.quizReducer);

  // console.log(quizs);

  const history = useHistory();

  // console.log(id);
  // useEffect(() => {
  //   let newQuestion = {
  //     questionText: "Question",
  //     answer: false,
  //     answerKey: "",
  //     questionType: "checkbox",
  //     options: [{ optionText: "Option 1" }, { optionText: "Option 2" }],
  //     open: true,
  //     required: false,
  //   };

  //   setQuestions([...questions, newQuestion]);
  // }, []);

  const handleImgUpload = (url, i) => {
    let optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionUrl = url;
    setQuestions(optionsOfQuestion);
  };

  useEffect(() => {
    const currentQuiz = quizs?.find((quiz) => quiz?.id === id);
    // console.log(currentQuiz);
    if (currentQuiz) {
      setQuestions(currentQuiz?.questions);
      setDocName(currentQuiz?.document_name);
    } else {
      let newQuestion = {
        questionText: "Question",
        questionUrl: "",
        answer: false,
        answerKey: "",
        questionType: "checkbox",
        options: [{ optionText: "Option 1" }, { optionText: "Option 2" }],
        open: true,
        required: false,
      };

      setQuestions([...questions, newQuestion]);
    }
  }, []);

  function changeType(e) {
    dispatch({
      type: "CHANGE_TYPE",
      questionType: e.target.id,
    });
    setType(e.target.id);
  }

  useEffect(() => {
    setType(questionType);
  }, [changeType]);

  function commitToDB() {
    // console.log(questions)
    // console.log(quizs);
    dispatch({
      type: SET_QUESTIONS,
      payload: questions,
    });

    const currectIndex = quizs?.findIndex((quiz) => quiz?.id === id);
    // console.log(currectIndex);

    if (currectIndex >= 0) {
      quizs[currectIndex].document_name = documentName;
      quizs[currectIndex].questions = questions;
    } else {
      quizs.push({
        id,
        document_name: documentName,
        questions,
      });
    }

    history.push("/");
  }

  function addMoreQuestionField() {
    expandCloseAll();

    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Question",
        questionUrl: "",
        questionType: "checkbox",
        options: [{ optionText: "Option 1" }, { optionText: "Option 2" }],
        open: true,
        required: false,
        answer: false,
        answerKey: "",
      },
    ]);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function handleOptionValue(text, i, j) {
    let optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    let optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    let itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function addOption(i) {
    let optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length >= 2) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  }

  function setOptionAnswer(ans, qno) {
    let Questions = [...questions];
    Questions[qno].answer = ans;
    setQuestions(Questions);
    // console.log(qno + " " + ans);
  }

  function setOptionPoints(points, qno) {
    let Questions = [...questions];
    Questions[qno].points = points;
    setQuestions(Questions);
    // console.log(qno + " " + points);
  }
  function addAnswer(i) {
    // console.log(i);
    let answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = true;
    answerOfQuestion[i].answerKey = i;
    setQuestions(answerOfQuestion);
  }

  function doneAnswer(i) {
    let answerOfQuestion = [...questions];
    // answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    answerOfQuestion[i].answer = true;
    answerOfQuestion[i].answerKey = i;
    setQuestions(answerOfQuestion);
  }

  function removeOption(i, j) {
    let optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      // console.log(i + "__" + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  function questionsUI() {
    return questions?.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>

                <Accordion
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1}
                    style={{ width: "100%" }}
                  >
                    {!questions[i].open ? (
                      <div className="saved_questions">
                        <Typography
                          style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            letterSpacing: ".1px",
                            lineHeight: "24px",
                            paddingBottom: "8px",
                          }}
                        >
                          {i + 1}. {ques.questionText}
                        </Typography>

                        {ques.options.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                style={{
                                  marginLeft: "5px",
                                  marginBottom: "5px",
                                }}
                                disabled
                                control={
                                  <input
                                    type={ques.questionType}
                                    color="primary"
                                    style={{ marginRight: "3px" }}
                                    required={ques.type}
                                  />
                                }
                                label={
                                  <Typography
                                    style={{
                                      fontFamily: " Roboto,Arial,sans-serif",
                                      fontSize: " 13px",
                                      fontWeight: "400",
                                      letterSpacing: ".2px",
                                      lineHeight: "20px",
                                      color: "#202124",
                                    }}
                                  >
                                    {ques.options[j].optionText}
                                  </Typography>
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </AccordionSummary>
                  <div className="question_boxes">
                    {!ques.answer ? (
                      <AccordionDetails className="add_question">
                        <div>
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question"
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                            />
                            <input
                              type="text"
                              className="question"
                              placeholder="Image Url"
                              value={ques.questionUrl}
                              onChange={(e) =>
                                handleImgUpload(e.target.value, i)
                              }
                            />
                          </div>

                          {ques.options.map((op, j) => (
                            <div className="add_question_body" key={j}>
                              {ques.questionType != "text" ? (
                                <input
                                  type={ques.questionType}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : (
                                <ShortTextIcon
                                  style={{ marginRight: "10px" }}
                                />
                              )}
                              <div>
                                <input
                                  type="text"
                                  className="text_input"
                                  placeholder="option"
                                  value={ques.options[j].optionText}
                                  onChange={(e) => {
                                    handleOptionValue(e.target.value, i, j);
                                  }}
                                />
                              </div>

                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  removeOption(i, j);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </div>
                          ))}

                          {ques.options.length < 100 ? (
                            <div className="add_question_body">
                              <FormControlLabel
                                disabled
                                control={
                                  ques.questionType != "text" ? (
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      inputProps={{
                                        "aria-label": "secondary checkbox",
                                      }}
                                      style={{
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                      }}
                                      disabled
                                    />
                                  ) : (
                                    <ShortTextIcon
                                      style={{ marginRight: "10px" }}
                                    />
                                  )
                                }
                                label={
                                  <div>
                                    <input
                                      type="text"
                                      className="text_input"
                                      style={{
                                        fontSize: "13px",
                                        width: "60px",
                                      }}
                                      placeholder="Add other"
                                    />
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addOption(i);
                                      }}
                                      style={{
                                        textTransform: "none",
                                        color: "#4285f4",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Add Option
                                    </Button>
                                  </div>
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="add_footer">
                            <div className="add_question_bottom_left">
                              <Button
                                size="small"
                                onClick={() => {
                                  addAnswer(i);
                                }}
                                style={{
                                  textTransform: "none",
                                  color: "#4285f4",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {" "}
                                <FcRightUp
                                  style={{
                                    border: "2px solid #4285f4",
                                    padding: "2px",
                                    marginRight: "8px",
                                  }}
                                />{" "}
                                Answer key
                              </Button>
                            </div>

                            <div className="add_question_bottom">
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteQuestion(i);
                                }}
                              >
                                <BsTrash />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    ) : (
                      <AccordionDetails className="add_question">
                        <div className="top_header">Choose Correct Answer</div>
                        <div>
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question "
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                              disabled
                            />
                            <input
                              type="number"
                              className="points"
                              min="0"
                              step="1"
                              placeholder="0"
                              onChange={(e) => {
                                setOptionPoints(e.target.value, i);
                              }}
                            />
                          </div>

                          {ques.options.map((op, j) => (
                            <div
                              className="add_question_body"
                              key={j}
                              style={{
                                marginLeft: "8px",
                                marginBottom: "10px",
                                marginTop: "5px",
                              }}
                            >
                              <div key={j}>
                                <div style={{ display: "flex" }} className="">
                                  <div className="form-check">
                                    <label
                                      style={{ fontSize: "13px" }}
                                      onClick={() => {
                                        setOptionAnswer(
                                          ques.options[j].optionText,
                                          i
                                        );
                                      }}
                                    >
                                      {ques.questionType != "text" ? (
                                        <input
                                          type={ques.questionType}
                                          name={ques.questionText}
                                          value="option3"
                                          className="form-check-input"
                                          required={ques.required}
                                          style={{
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                            marginTop: "5px",
                                          }}
                                        />
                                      ) : (
                                        <ShortTextIcon
                                          style={{ marginRight: "10px" }}
                                        />
                                      )}

                                      {ques.options[j].optionText}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="add_question_bottom">
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{
                                textTransform: "none",
                                color: "#4285f4",
                                fontSize: "12px",
                                marginTop: "12px",
                                fontWeight: "600",
                              }}
                              onClick={() => {
                                doneAnswer(i);
                              }}
                            >
                              Done
                            </Button>
                          </div>
                        </div>
                      </AccordionDetails>
                    )}
                    {!ques.answer ? (
                      <Box sx={{ cursor: "pointer" }}>
                        <AddCircleOutlineIcon onClick={addMoreQuestionField} />
                      </Box>
                    ) : (
                      ""
                    )}
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <>
      <Header />
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link to={`/response/${id}`}>
          <Button variant="contained" color="primary">
            View Quiz
          </Button>
        </Link>
      </Box>

      <div className="mt-5">
        <div className="CreateQuiz">
          <br />
          <div className="section">
            <div className="question_title_section">
              <div className="question_form_top">
                {/* <label>Quiz Title</label> */}
                <input
                  type="text"
                  className="question_form_top_name"
                  style={{ color: "black" }}
                  placeholder="Quiz Title"
                  value={documentName}
                  onChange={(e) => {
                    setDocName(e.target.value);
                  }}
                />
              </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questionsUI()}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="save_form">
              <Button
                variant="contained"
                color="primary"
                onClick={commitToDB}
                style={{ fontSize: "14px" }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateQuiz;
