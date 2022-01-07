import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from '../Navbar';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Admin from '../../pages/Admin';
import ListHabits from '../Habits/ListHabits';
import ListRituals from '../Rituals/ListRituals';

const index = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Profil" exact element={<Profil />} />
        <Route path="/Admin" exact element={<Admin />}>
          <Route path="Habits" exact element={<ListHabits />} />
          <Route path="Rituals" exact element={<ListRituals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export default index;


/*

*/
