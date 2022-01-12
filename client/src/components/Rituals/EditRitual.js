import React from "react";

import WeekDayPicker from "./WeekDayPicker"

import M from  'materialize-css';



const EditRitual = () => {

  useEffect( () => {
    /*
    var modal = document.getElementById('modal-ritual-editor');
    var instances = M.Modal.init(modal, {});
    */
  }, [])

  return (
    <div id="modal-ritual-editor" className="modal">
      <div className="modal-content">
      <h1>Edit Ritual</h1>
      <table id="modal2_table" className="striped">
        <tbody>
        </tbody>
      </table>
      </div>
      <div className="modal-footer">
        {/*<a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={saveHabits}>Confirmer</a>*/}
      </div>
      <WeekDayPicker />
    </div>
  )
}

export default EditRitual
