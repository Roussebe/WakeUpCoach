import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getHabits } from "./actions/habit.actions";
import { getRituals } from "./actions/ritual.actions";

import logger from 'redux-logger'

if( ! process.env.REACT_APP_API_URL )
{
  process.env.REACT_APP_API_URL = "/"
}

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      console.log( "GET " + `${process.env.REACT_APP_API_URL}jwtid`)
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: false,
      })
        .then((res) => {
          console.log ("Received" , res )
          setUid(res.data);
        })
        .catch((err) => {
          console.log("No token", err);
        })
    };

    fetchToken();
    console.log( "uid", uid )
    if (uid) {
      console.log( "Get the informations" )
      dispatch(getUser(uid));
      dispatch(getHabits(20));
      dispatch(getRituals(20));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );


};


export default App;
