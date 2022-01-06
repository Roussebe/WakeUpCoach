import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from '../Navbar';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';

import ListHabits from '../Habits/ListHabits';
import AddHabit from '../Habits/AddHabit';
import EditHabit from '../Habits/EditHabit';

const index = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/profil" exact element={<Profil />} />
        <Route path="/habits/" exact element={<ListHabits />} />
      </Routes>
    </BrowserRouter>
  );
};


export default index;


/*

*/
