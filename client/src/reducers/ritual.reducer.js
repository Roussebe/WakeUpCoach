import {
  DELETE_RITUAL,
  GET_RITUALS,
  TICK_HABIT,
  UPDATE_RITUAL_HABIT,
  UPDATE_RITUAL,
} from "../actions/ritual.actions";

const initialState = {};

export default function ritualReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RITUALS:
      return action.payload;

    case UPDATE_RITUAL_HABIT: {
      let newState = [...state]
      let idx = newState.findIndex( (s) => s._id === action.payload._id )
      newState[idx] = action.payload
      return newState
    }

    case TICK_HABIT: {
      let result = [...state]
      let rIdx = result.findIndex( r => r._id === action.payload.ritual._id )
      result[rIdx] = action.payload.ritual
      return result
    }


    case UPDATE_RITUAL:
      return state.map((ritual) => {
        if (ritual._id === action.payload.ritualId) {
          return {
            ...ritual,
            message: action.payload.message,
          };
        } else return ritual;
      });
    case DELETE_RITUAL:
      return state.filter((ritual) => ritual._id !== action.payload.ritualId);
    default:
      return state;
  }
}
