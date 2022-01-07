import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ritual from "./Ritual";
import HabitsAddToRitual from "./HabitsAddToRitual"

const ListRituals = () => {
  const userData = useSelector((state) => state.userReducer);
  const [currentRitualId, setCurrentRitualId] = useState( 0 )

  function onAddHabits( id ) {
    setCurrentRitualId( id )
  }

  return (
    <>
      <ul>
        { userData.rituals && (
          userData.rituals.map((ritual) => {
            return <Ritual key={ritual.key} ritual={ritual} onAddHabits={onAddHabits} />
          })
        )}
      </ul>
      <a class="waves-effect waves-light btn modal-trigger" href="#modal-add-habits-to-ritual">Modal</a>
      <HabitsAddToRitual ritualId={currentRitualId}/>
    </>
  );
};

export default ListRituals;
