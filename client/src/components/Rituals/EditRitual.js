import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {isEmpty} from "../Utils"

import WeekDayPicker from "./WeekDayPicker"

import M from  'materialize-css';
import $ from 'jquery';

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

  const saveRitual = () => {
    let newRitual = {...getRitual(ritualId) }
    const form = document.getElementById( "editRitualForm" )
    const title = $( "#editRitualForm #title" )

    console.log( newRitual )
    console.log( title.val() )
  }

  return (
    <div id="modal-ritual-editor" className="modal">
      {getRitual( ritualId ) &&
        <div className="modal-content">
            <form class="col s12" id="editRitualForm">
              <div class="input-field row">
                  <input id="title" type="text" value={getRitual(ritualId).title}></input>
              </div>
              <div class="input-field row">
                <label class="active" for="time">Alarm</label>
                <input  id="time" type="time" value={getRitual(ritualId).time} />
              </div>
              <div class="row">
                <WeekDayPicker />
              </div>
            </form>
        </div>
      }
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={saveRitual}>Confirm</a>
      </div>

    </div>
  )
}

export default EditRitual
