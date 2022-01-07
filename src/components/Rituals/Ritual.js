import React, { useContext } from "react";

import DeleteRitual from "./DeleteRitual";

import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import { tickHabit } from "../../actions/user.actions";

const Ritual = ({ritual}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  function validateHabit(e, ritual, habit) {
    dispatch(tickHabit(userData.id, ritual, habit));
  }



  function showHabit() {}

  return (
    <li className="card-container" >
          <div className="card-right">
            <div className="card-header">
              <div className="time left"><h6>{ritual.time}</h6></div>
              <div className="title left"><h6>{ritual.title}</h6></div>
              <div className="card-actions right">
                <i className="material-icons black-text">edit</i>
                <i className="material-icons black-text">add</i>
              </div>

            </div>
            <div className="card-body">
              {ritual.habits.map( (habit) => (
                <div className="black-text habit-card">
                  <div className="gh-details">
                  <div className="gh-subtitle" onClick={(e) => this.showHabit(e, ritual, habit)
                  }>{habit.title}</div>
                </div>
                <div className="gh-options"><a onClick={(e) => validateHabit(e, ritual, habit)} >
                  {habit.achieved
                    ? <i className="green-text far fa-check-circle" />
                    : <i className="blue-text far fa-circle" />
                  }
                </a></div>
                </div>
              ))}
            </div>

            <div className="card-footer">
            </div>
          </div>
    </li>
  );
};

export default Ritual;
