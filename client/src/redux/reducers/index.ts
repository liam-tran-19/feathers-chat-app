import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import statusReducer from './statusReducer';
import chatReducers from './chatReducers';

const RootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  status: statusReducer,
  chat: chatReducers
});

export default RootReducer
