import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const TICK_HABIT = "TICK_HABIT";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
  return (dispatch) => {
    console.log( "getUser" )
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        console.log( res.data )
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        console.log( res.data )
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const tickHabit = (userId, ritual, habit) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/data/` ,
      data: { params: {ritual, habit} },
    })
      .then((res) => {
        console.log( res.data )
        dispatch({ type: TICK_HABIT, payload: {ritual, habit} });
      })
      .catch((err) => console.log(err));
  };
}
