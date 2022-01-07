import axios from "axios";

export const GET_HABITS = "GET_HABITS";

export const getHabits = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/list_habits/`)
      .then((res) => {
        console.log( "/api/list_habits result " , res.data )
        //const array = res.data.slice(0, num);
        dispatch({ type: GET_HABITS, payload: res.data.habits });
      })
      .catch((err) => console.log(err));
  };
};
