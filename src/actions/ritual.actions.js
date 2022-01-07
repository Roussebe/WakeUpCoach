import axios from "axios";

//
export const GET_RITUALS = "GET_RITUALS";
export const UPDATE_RITUAL_HABIT = "UPDATE_RITUAL_HABIT"
export const ADD_RITUAL = "ADD_RITUAL";
export const UPDATE_RITUAL = "UPDATE_RITUAL";
export const DELETE_RITUAL = "DELETE_RITUAL";

// errors
export const GET_RITUAL_ERRORS = "GET_RITUAL_ERRORS";

export const getRituals = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/ritual/`)
      .then((res) => {
        console.log( "/api/ritual result " , res.data )
        dispatch({ type: GET_RITUALS, payload: res.data.rituals });
      })
      .catch((err) => console.log(err));
  };
};

export const updateRitualHabits = (ritual, habits) => {
  return (dispatch) => {
    const request = habits
      .filter( (h) => h.selected )
      .map( (h) => {
        return { _id: h.key, title: h.title }
      })

    return axios.post(`${process.env.REACT_APP_API_URL}api/ritual/upd_habit/${ritual}`, { data : request} )
      .then( (res) => {
        console.log( "/api/ritual/upd_habit/", res.data )
        dispatch( { type: UPDATE_RITUAL_HABIT, payload: res.data.ritual } )
      } )
      .catch( (error) => { console.error( error ) });
  }
}

export const addRitual = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/ritual/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_RITUAL_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_RITUAL_ERRORS, payload: "" });
        }
      });
  };
};

export const updateRitual = (ritualId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/ritual/${ritualId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_RITUAL, payload: { message, ritualId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteRitual = (ritualId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/ritual/${ritualId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_RITUAL, payload: { ritualId } });
      })
      .catch((err) => console.log(err));
  };
};
