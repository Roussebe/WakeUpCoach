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
      console.log( "Result: ", result )
      console.log( action )
      let ritual = result.rituals.find( r => r.key == action.payload.ritual.key )
      console.log( "Ritual", ritual)
      let hIdx = ritual.habits.findIndex( h => h._id == action.payload.habit._id )
      console.log( "hIdx = " + hIdx )
      let habit = {...ritual.habits[hIdx]}
      console.log( "Habit", habit )
      habit.achieved = true
      ritual.habits[hIdx] = habit
      return result
    }
    default:
      return state;
  }
}
