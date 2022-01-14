import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRituals } from "../../actions/habit.actions";
import {updateRitualHabits} from "../../actions/ritual.actions"

import M from  'materialize-css';

import {isEmpty} from "../Utils"

const HabitSelector = ({habit, myClick}) => {
  return (
    <tr><td>{habit.title}</td>
      {!habit.selected
        ? <td className="green-text bold" onClick={myClick}>Ajouter</td>
        : <td className="red-text bold" onClick={myClick}>Retirer</td>
      }
    </tr>
  )
}

const HabitsAddToRitual = ( {ritualId} ) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer);
  const rituals = useSelector((state) => state.ritualReducer);
  const habits = useSelector((state) => state.habitReducer);
  const [userHabitSelection, setUserHabitSelection] = useState( [] )


  useEffect( () => {
    console.log( "HabitsAddToRitual useEffect" )
    if( document && document.getElementById('modal-add-habits-to-ritual' ) ) {
      var modal = document.getElementById('modal-add-habits-to-ritual');
      var instances = M.Modal.init(modal, {});
    }
  }, [])



  useEffect( () => {
    if( !isEmpty(habits) && !isEmpty(rituals) && ritualId ) {
      const newSelection = habits.map( habit => {
        return {
          title: habit.title,
          selected:
            rituals.find( ritual => ritual._id == ritualId )
              .habits.find( h => h._id == habit._id )
            ? true
            : false
          ,
          _id: habit._id
        }
      })
      console.log( "New Selection ", newSelection )
      setUserHabitSelection ( newSelection )
    }
  },[ritualId])

  function toogleSelection( habit ) {
    let changedHabit = {...habit, selected: !habit.selected}
    let newSelection = userHabitSelection.slice()
    let idx = newSelection.findIndex( (h) => { return h._id == habit._id } )
    newSelection[idx] = changedHabit
    setUserHabitSelection( newSelection )
  }

  function saveHabits() {
    dispatch(updateRitualHabits(ritualId, userHabitSelection))
  }

  return (
    <div id="modal-add-habits-to-ritual" className="modal">
      <div className="modal-content">
      <table id="modal1_table" className="striped">
        <tbody>
        {userHabitSelection.map( habit => {
          return <HabitSelector habit={habit} key={habit._id} myClick={(e) => {return toogleSelection(habit)} } />
        })}
        </tbody>
      </table>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={saveHabits}>Confirmer</a>
      </div>
    </div>
  )
}

export default HabitsAddToRitual
