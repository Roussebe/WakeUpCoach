import {
  GET_HABITS,
} from "../actions/habit.actions";

const initialState = {};

export default function ritualReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HABITS:
      return action.payload;
    default:
      return state;
  }
}
