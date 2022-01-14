import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {isEmpty} from "../Utils"

import WeekDayPicker from "./WeekDayPicker"

import M from  'materialize-css';


const EditRitual = ( {ritualId} ) => {
  const rituals = useSelector((state) => state.ritualReducer);
  let ritual = null

  useEffect ( () => {
    console.log( "EditRitual UseEffect" )
    var modal = document.getElementById('modal-ritual-editor');
    var instance = M.Modal.init(modal, {});
  }, [])

  const getRitual = ( id ) => {
    if( !isEmpty(rituals) )
      return rituals.find( r => r._id === id )
  }

  return (
    <div id="modal-ritual-editor" className="modal">
      {getRitual( ritualId ) &&
        <div className="modal-content">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input placeholder="Placeholder" id="title" type="text" class="validate" value={getRitual(ritualId).title}/>
                  <label for="title">Title</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate" />
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <WeekDayPicker />
              </div>
            </form>
        </div>
      }
      <div className="modal-footer">
        {/*<a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={saveHabits}>Confirmer</a>*/}
      </div>

    </div>
  )
}

export default EditRitual
