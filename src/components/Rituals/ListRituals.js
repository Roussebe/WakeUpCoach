import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getPosts } from "../actions/post.actions";
import Ritual from "./Ritual";
import { isEmpty } from "../Utils";

const ListRituals = () => {
  //const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);

  return (
      <ul>
        { userData.rituals && (
          userData.rituals.map((ritual) => {
            return <Ritual key={ritual.key} ritual={ritual} />
          })
        )}
      </ul>
  );
};

/*
{ !userData.rituals && !isEmpty(userData.rituals[0]) &&
  userData.rituals.map((ritual) => {
    return <li key={ritual.key}>{ritual.title}</li>
})}



  {!isEmpty(userData.rituals[0]) &&
    userData.rituals.map((ritual) => {
      return <Ritual ritual={ritual} key={ritual._id} />;
    })}
</ul>*/

export default ListRituals;
