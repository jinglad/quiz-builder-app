import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Header from "../../components/Header/Header";
import { SET_QUESTIONS } from "../../Redux/types";

const AdminHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createForm = () => {
    let createFormId = uuid();
    history.push(`/form/${createFormId}`);
    let questions = [
      {
        questionText: "Question",
        questionType: "checkbox",
        options: [{ optionText: "Option 1" }, { optionText: "Option 2" }],
        open: true,
        required: false,
      },
    ];

    dispatch({
      type: SET_QUESTIONS,
      payload: questions,
    });
  };

  const { quizs } = useSelector((state) => state.quizReducer);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="d-flex flex-end">
          <div onClick={createForm} style={{ cursor: "pointer" }}>
            <button className="btn btn-primary">Create New Quiz</button>
          </div>
        </div>
        <div className="mt-5">
          {quizs?.map((quiz) => (
            <div
              key={quiz.id}
              className="my-3 p-2 border rounded"
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/form/${quiz.id}`)}
            >
              <h3>{quiz.document_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
