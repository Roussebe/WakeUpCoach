import React, { useContext } from "react";
import M from  'materialize-css';

class HabitsAddToRitual extends React.Component {
  constructor( props ) {
    super( props )
  }

  componentDidMount() {
    var modal = document.getElementById('modal-add-habits-to-ritual');
    var instances = M.Modal.init(modal, {});
  }

  render() {
    return (
      <div id="modal-add-habits-to-ritual" class="modal">
        <div class="modal-content">
          <h4>Modal Header - {this.props.ritualId}</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    )
  }

}

export default HabitsAddToRitual
