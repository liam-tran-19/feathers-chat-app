import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import statusReducer from './statusReducer';

const RootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  status: statusReducer
});

export default RootReducer
