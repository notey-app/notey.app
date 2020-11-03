import {
  CREATE_NOTE,
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE_ERR,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_LOADING,
  GET_SHARE_BY_ID,
} from "../utils/types";

const initState = {
  notes: [],
  note: {},
  share: null,
  createdNote: {},
  error: null,
  loading: false,
};

export default function noteReducer(state = initState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: action.notes,
        createdNote: action.createdNote,
        note: action.createdNote,
        error: null,
      };
    case GET_ACTIVE_NOTE:
      return {
        ...state,
        note: action.note,
      };
    case CREATE_NOTE_ERR:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: action.notes,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: action.notes,
        note: action.note,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case "SHARE_NOTE":
      return {
        ...state,
        notes: action.notes,
      };
    case GET_SHARE_BY_ID:
      return {
        ...state,
        share: action.share,
      };
    default:
      return {
        ...state,
      };
  }
}
