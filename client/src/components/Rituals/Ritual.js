import DeleteRitual from "./DeleteRitual";

import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import { tickHabit } from "../../actions/ritual.actions";
import WeekDayPicker from "./WeekDayPicker";

function isHabitAchieved( ritual, habit, day ) {
  if( !day ) {
    const today = new Date()
    day = (today.getMonth()+1) + "/" + today.getDate() + "/" + (today.getFullYear())
  }

  let habits = ritual.habits

  if( ritual.history && ritual.history.habits[day] ) {
    const achievements = ritual.history.habits[day]
    let dayHabit = achievements.find( a => a.habit == habit._id )
    if( dayHabit ) return true
  }
  return false
}

const Ritual = ({ritual, onAddHabits, onEditRitual}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  function validateHabit(ritual, habit) {
    dispatch(tickHabit(ritual, habit));
  }

  function showHabit() {}

  return (
    <li className="card-container" >
          <div className="card-right">
            <div className="card-header">
              <div className="time left"><h6>{ritual.time}</h6></div>
              <div className="title left"><h6>{ritual.title}</h6></div>
              <div className="card-actions right">
                <a className="modal-trigger" onClick={(e) => onAddHabits(ritual._id)} href="#modal-ritual-editor">
                  <i className="material-icons black-text" >edit</i>
                </a>
                <a className="modal-trigger" onClick={(e) => onAddHabits(ritual._id)} href="#modal-add-habits-to-ritual" >
                  <i className="material-icons black-text">add</i>
                </a>
              </div>
            </div>
            <div className="card-body">
              {ritual.habits.map( (habit) => (
                <div className="black-text habit-card" key={habit._id}>
                  <div className="gh-details">
                  <div className="gh-subtitle" onClick={(e) => showHabit(ritual, habit)
                  }>{habit.title}</div>
                </div>
                <div className="gh-options"><a onClick={(e) => validateHabit(ritual, habit)} >
                  {isHabitAchieved( ritual, habit )
                    ? <i className="green-text far fa-check-circle" />
                    : <i className="blue-text far fa-circle" />
                  }
                </a></div>
                </div>
              ))}
            </div>

            <div className="card-footer">
              <WeekDayPicker />
            </div>
          </div>
    </li>
  );
};

export default Ritual;
