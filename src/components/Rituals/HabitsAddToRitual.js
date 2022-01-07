import React, { useContext, useEffect } from "react";

import { useSelector } from "react-redux";
import { getRituals } from "../../actions/habit.actions";

import M from  'materialize-css';

const HabitSelector = ({habit}) => {
  function toogleSelection() {}

  return (
    <tr><td>{habit.title}</td>
      {!habit.selected
        ? <td className="green-text bold" onClick={toogleSelection}>Ajouter</td>
        : <td className="red-text bold" onClick={toogleSelection}>Retirer</td>
      }
    </tr>
  )
}


const HabitsAddToRitual = () => {
  const habits = useSelector((state) => state.habitReducer);

  useEffect( () => {
    console.log( "Mounting" )
    var modal = document.getElementById('modal-add-habits-to-ritual');
    var instances = M.Modal.init(modal, {});
  }, [])

  function listItems( ) {
    console.log( "ListItems " , habits )
    if( Array.isArray(habits) ) {
      return habits.map( habit => {
        return ( <HabitSelector habit={habit} key={habit.key} /> )
      })
    }
    else {
      return
    }
  }

  return (
    <div id="modal-add-habits-to-ritual" class="modal">
      <div class="modal-content">
      <table id="modal1_table" className="striped">
        <tbody>
        {listItems()}
        </tbody>
      </table>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
  )
}

export default HabitsAddToRitual
