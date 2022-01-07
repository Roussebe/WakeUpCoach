import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getHabits } from "./actions/habit.actions";
import logger from 'redux-logger'

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log( "useEffect" )
    const fetchToken = async () => {
      console.log( "Fetch tocken")
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log( "Result data", res.data )
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };

    fetchToken();
    console.log( uid )
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getHabits(20));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );


};


export default App;
