import {
  GET_USER,
  UPDATE_BIO,
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

    default:
      return state;
  }
}
