import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./UserResponse.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

function UserResponse() {
  let quest = [];
  let post_answer = [];
  let history = useHistory();
  const { id } = useParams();

  // console.log(id)

  let [answer, setAnswer] = useState([]);
  // let [{ questions, doc_name, doc_desc }, dispatch] = useStateValue();
  const dispatch = useDispatch();
  const { quizs } = useSelector((state) => state.quizReducer);
  const [currentQuiz, setCurrentQuiz] = useState(
    quizs?.find((quiz) => quiz?.id === id)
  );
  const [score, setScore] = useState(0);

  function selectcheck(e, que, option) {
    // console.log(option);
    const currentQues = currentQuiz?.questions.find(
      (ques) => ques.questionText === que
    );
    // console.log("currentQues ", currentQues );
    if (currentQues?.answerKey === option) {
      let currentScore = score + Number(currentQues?.points);
      setScore(currentScore);
      // console.log(score);
    }
  }

  function submit() {
    alert(`Your Score is ${score}`);
    history.push('/');
  }
  return (
    <>
      <Header />
      <div className="submit">
        <div className="user_form">
          <div className="user_form_section">
            <div className="user_title_section">
              <Typography style={{ fontSize: "26px" }}>
                {currentQuiz?.document_name}
              </Typography>
            </div>

            {currentQuiz?.questions.map((question, qindex) => (
              <div className="user_form_questions">
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    letterSpacing: ".1px",
                    lineHeight: "24px",
                    paddingBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  {qindex + 1}. {question.questionText}
                </Typography>
                {
                  <img src={question?.questionUrl} className="w-50 mb-4" />
                }
                {question.options.map((ques, index) => (
                  <div key={index} style={{ marginBottom: "5px" }}>
                    <div style={{ display: "flex" }}>
                      <div className="form-check">
                        <label>
                          <input
                            type={question.questionType}
                            name={qindex}
                            value={ques.optionText}
                            className="form-check-input"
                            required={question.required}
                            style={{ margnLeft: "5px", marginRight: "5px" }}
                            onChange={(e) => {
                              selectcheck(
                                e.target.checked,
                                question.questionText,
                                index
                              );
                            }}
                          />{" "}
                          {ques.optionText}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="user_form_submit">
              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                style={{ fontSize: "14px" }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserResponse;
