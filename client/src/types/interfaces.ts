import { E_ERROR } from './enum';
import {RouteProps} from 'react-router';
import {FIND_ALL_STATUS_SUCCESS, FIND_ALL_STATUS_FAIL,FIND_ALL_STATUS_LOADING, UPDATE_STATUS_FAIL, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_LOADING} from '../redux/actions/types'

// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IAuthFunction {
  _id: number;
  username?: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}

export type ProtectedRouteProps = {
  component: any;
} & RouteProps;

export interface IChat {
  idTexter: number;
  idFriend: number;
  searchName: string
}

export interface IUserObj {
  _id: number;
  username: string;
  email: string;
}

export interface IMsg {
  sender: number;
  text: string;
  createdAt: any;
}

export interface IChatMsg {
  key: number;
  message: any 
  userId: number;
}

export interface IComments {
  idCommenter: number;
  nameCommenter: string;
  contentComment: string
}

export interface IAllPosts{
  _id: number;
  idPoster: number;
  postedDetails: string,
  idLiker: Array<number>
  comments: Array<IComments>
}

export interface IPosts {
  key: number,
  post: IAllPosts
}

export interface StatusSuccess {
  type: typeof FIND_ALL_STATUS_SUCCESS,
  payload: IAllPosts[]
}
export interface StatusFail {
  type: typeof FIND_ALL_STATUS_FAIL
}

export interface StatusLoading {
  type: typeof FIND_ALL_STATUS_LOADING
}
export interface UpdateSuccess {
  type: typeof UPDATE_STATUS_SUCCESS,
  payload: IAllPosts
}
export interface UpdateFail {
  type: typeof UPDATE_STATUS_FAIL
}

export interface UpdateLoading {
  type: typeof UPDATE_STATUS_LOADING
}

export type StatusActions = StatusSuccess | StatusFail | StatusLoading
export type UpdateActions = UpdateLoading | UpdateFail |UpdateSuccess


export interface IMessage  {
  idBoth: string,
  sender: number,
  text: string
}