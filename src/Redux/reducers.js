import {
  CHANGE_TYPE,
  SET_DOC_DESC,
  SET_DOC_NAME,
  SET_QUESTIONS,
  SET_QUIZES
} from "./types";

const initialState = {
  questions: [
    {
      questionText: "Question",
      questionType: "checkbox",
      options: [{ optionText: "Option 1" }],
      open: true,
      required: false,
    },
  ],
  quizs: [],
  questionType: "checkbox",
  doc_name: "Untitled form ",
  doc_desc: " add the description ",
};

const reducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case SET_QUIZES:
      console.log(action.payload)
      return {
        ...state,
        quizs: action.payload,
      };
    case SET_QUESTIONS:
      // console.log("question ", action.payload)
      return {
        ...state,
        questions: action.payload,
      };
    case CHANGE_TYPE:
      return {
        ...state,
        questionType: action.questionType,
      };
    case SET_DOC_NAME:
      return {
        ...state,
        doc_name: action.doc_name,
      };

    case SET_DOC_DESC:
      return {
        ...state,
        doc_desc: action.doc_desc,
      };
    default:
      return state;
  }
};

export default reducer;
