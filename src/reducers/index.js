import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import errorReducer from './error.reducer';
import habitReducer from './habit.reducer';

//import ritualReducer from './ritual.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
  errorReducer,
  habitReducer,
//  ritualReducer
});
