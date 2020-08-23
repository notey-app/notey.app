import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERR,
  DELETE_CATEGORY,
} from "../utils/types";

const initState = {
  categories: [],
  error: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: action.categories,
        error: "",
      };
    case CREATE_CATEGORY_ERR:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return {
        ...state,
      };
  }
}
