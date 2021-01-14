import { combineReducers } from 'redux';
import authReducer from './Auth/reducer';
import postReducer from './Post/reducer';

const stores = combineReducers({
  auth: authReducer,
  post: postReducer,
})

export default stores;