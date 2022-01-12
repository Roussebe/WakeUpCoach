import React from "react";


const weekDays = [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" ]

const WeekDayPicker = () => {

  return (
    <ul className="weekday-container">
        <li>L</li>
        <li className="selected">M</li>
        <li>M</li>
        <li>J</li>
        <li>V</li>
        <li>S</li>
        <li>D</li>
    </ul>
  )
}

export default WeekDayPicker
