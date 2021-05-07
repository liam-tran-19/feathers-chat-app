import {
  FIND_ALL_STATUS_FAIL,
  FIND_ALL_STATUS_LOADING,
  FIND_ALL_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_LOADING,
  UPDATE_STATUS_SUCCESS,
  DELETE_TWEET_FAIL,
  DELETE_TWEET_LOADING,
  DELETE_TWEET_SUCCESS,
} from "../actions/types";
import axios from "axios";
import { Dispatch } from "redux";
import { StatusActions, UpdateActions } from "../../types/interfaces";

export const getPosts = () => async (dispatch: Dispatch<StatusActions>) => {
  dispatch({
    type: FIND_ALL_STATUS_LOADING,
  });
  await axios
    .get("/api/status/all-posts")
    .then((res) => {
      dispatch({
        type: FIND_ALL_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FIND_ALL_STATUS_FAIL,
      });
    });
};

export const updatePost = (
  id: number | undefined,
  idLiker: any,
  contentComment: string | undefined,
  idCommenter: any,
  nameCommenter: any,
) => async (dispatch: Dispatch<UpdateActions>) => {
  dispatch({
    type: UPDATE_STATUS_LOADING,
  });
  if (idLiker) {
    await axios
      .put(`/api/status/update/id/${id}`, {
        idLiker: idLiker,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_STATUS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_STATUS_FAIL,
        });
      });
  } else if (idCommenter) {
    await axios
      .put(`/api/status/update/id/${id}`, {
        comments: {
          idCommenter: idCommenter,
          contentComment: contentComment,
          nameCommenter: nameCommenter
        },
      })
      .then((res) => {
        dispatch({
          type: UPDATE_STATUS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_STATUS_FAIL,
        });
      });
  }
};
export const deleteTweetActions = (
  id: number | undefined,
  idLiker: any,
  contentComment: string | undefined,
  idCommenter: any,
  nameCommenter: any,
) => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: DELETE_TWEET_LOADING,
  });
  if (idLiker) {
    await axios
      .put(`/api/status/delete/like-comment/${id}`, {
        idLiker: idLiker,
      })
      .then((res) => {
        dispatch({
          type: DELETE_TWEET_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_TWEET_FAIL,
        });
      });
  } else if (idCommenter) {
    await axios
      .put(`/api/status/delete/like-comment/${id}`, {
        idLiker: idLiker,
      })
      .then((res) => {
        dispatch({
          type: DELETE_TWEET_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_TWEET_FAIL,
        });
      });
  }
};
