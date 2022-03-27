import { CHANGE_TYPE, SET_DOC_DESC, SET_DOC_NAME, SET_QUESTIONS } from "./types";

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
  questionType: "checkbox",
  doc_name: "Untitled form ",
  doc_desc: " add the description ",
};

const reducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
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

export default reducer