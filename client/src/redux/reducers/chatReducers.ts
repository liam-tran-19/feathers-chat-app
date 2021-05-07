import { ChatSharp } from "@material-ui/icons";
import { IMsgData } from "../../types/interfaces";
import {
  GET_MESSAGE, ADD_NEW_MESSAGE,ADD_NEW_CONVERSATION
} from "../actions/types";

interface ChatInterface {
  chats: Array<IMsgData>
}

const defaultState: ChatInterface = {
  chats: [],
};

export default function(state: ChatInterface = defaultState, action: any) {
switch(action.type) {
  case GET_MESSAGE:
    return {
      ...state,
      chats: action.payload
    }

  case ADD_NEW_MESSAGE:
    return {
      ...state,
      chats: action.payload
    }

  case ADD_NEW_CONVERSATION:
    return {
      ...state,
      chats: action.payload
    }
  default:
    return state
}
}