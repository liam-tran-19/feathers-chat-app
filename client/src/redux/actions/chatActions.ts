import {
  GET_MESSAGE, ADD_NEW_MESSAGE,ADD_NEW_CONVERSATION
} from "../actions/types";
import axios from "axios";
import { Dispatch } from "redux";
import { IMsg } from "../../types/interfaces";

export const getMessage = (data:any) => async (dispatch: Dispatch<any>) => {
  await axios
  .post<any>("/api/chats/find-chat", data)
  .then((res) => {
    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    })
  });
}

export const addNewMessage = (data:any) => async (dispatch: Dispatch<any>) => {
  await axios.post<IMsg>("/api/chats/update", data).then(res => {
    dispatch({
      type: ADD_NEW_MESSAGE,
      payload: res.data
    })
  })
  
}


export const addNewConversation = (data:any) => async (dispatch: Dispatch<any>) => {
  await axios.post<IMsg>("/api/chats/new-chat", data).then(res => {
    dispatch({
      type: ADD_NEW_CONVERSATION,
      payload: res.data
    })
  })
}
