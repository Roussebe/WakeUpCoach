import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ritual from "./Ritual";
import HabitsAddToRitual from "./HabitsAddToRitual"
import {isEmpty} from "../Utils"

const ListRituals = () => {
  const rituals = useSelector((state) => state.ritualReducer);
  const [currentRitualId, setCurrentRitualId] = useState( 0 )

  function onAddHabits( id ) {
    setCurrentRitualId( id )
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
      <HabitsAddToRitual ritualId={currentRitualId}/>
    </>
  );
};

export default ListRituals;
