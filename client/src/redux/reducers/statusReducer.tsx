import { IAllPosts, StatusActions } from "../../types/interfaces";
import {
  FIND_ALL_STATUS_FAIL,
  FIND_ALL_STATUS_SUCCESS,
  FIND_ALL_STATUS_LOADING,
  UPDATE_STATUS_FAIL, UPDATE_STATUS_LOADING, UPDATE_STATUS_SUCCESS
} from "../actions/types";

interface StatusInterface {
  loading: boolean;
  posts: Array<IAllPosts>;
}

const defaultState: StatusInterface = {
  loading: false,
  posts: [],
};

export default function (
  state: StatusInterface = defaultState,
  action: StatusActions
) {
  switch (action.type) {
    case FIND_ALL_STATUS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FIND_ALL_STATUS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case FIND_ALL_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    default:
      return state;
  }
}
