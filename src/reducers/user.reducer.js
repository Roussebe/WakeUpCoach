import {
  GET_USER,
  UPDATE_BIO,
  TICK_HABIT,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:{
      console.log( "user reducer get user " , action.payload )
      return action.payload;
    }
    /*
    case UPDATE_USER_RITUAL: {
      let newState = {...state}
      let rIdx = newState.rituals.findIndex( r => r.key == action.payload.ritual._id )
      newState.rituals[rIdx] = action.payload.ritual
      return newState
    }*/
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case TICK_HABIT: {
      let result = {
        ...state,
        rituals: state.rituals.slice()
      }
      let ritual = result.rituals.find( r => r.key == action.payload.ritual.key )
      let hIdx = ritual.habits.findIndex( h => h._id == action.payload.habit._id )
      let habit = {...ritual.habits[hIdx]}
      habit.achieved = true
      ritual.habits[hIdx] = habit
      return result
    }
    default:
      return state;
  }
}
