import axios from "axios";

//
export const GET_RITUALS = "GET_rituals";
export const GET_ALL_RITUALS = "GET_ALL_RITUALS";
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
        const array = res.data.slice(0, num);
        dispatch({ type: GET_RITUALS, payload: array });
        dispatch({ type: GET_ALL_RITUALS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

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
