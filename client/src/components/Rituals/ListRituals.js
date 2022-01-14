import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ritual from "./Ritual";
import HabitsAddToRitual from "./HabitsAddToRitual"
import EditRitual from "./EditRitual"
import {isEmpty} from "../Utils"

const ListRituals = () => {
  const rituals = useSelector((state) => state.ritualReducer);
  const [currentRitualId, setCurrentRitualId] = useState( 0 )
  let M = null


  function onAddHabits( id ) {
    console.log( 'Add Habit')
    setCurrentRitualId( id )
  }

  function onUpdateRitual() {

  }

  return (
    <>
      <ul>
        { !isEmpty(rituals) && (
          rituals.map((ritual) => {
            return <Ritual key={ritual._id} ritual={ritual} onAddHabits={onAddHabits} />
          })
        )}
      </ul>
      <HabitsAddToRitual ritualId={currentRitualId} />
      <EditRitual ritualId={currentRitualId} />
    </>
  );
};

export default ListRituals;
