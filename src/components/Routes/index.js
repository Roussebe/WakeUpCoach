import React from 'react';

/*import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
*/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
/*
import Trending from '../../pages/Trending';
*/
import Navbar from '../Navbar';

const index = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/profil" exact element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
};
/*
<Routes>
  <Route path="/" exact element={<Home />} />
  <Route path="/profil" exact element={<Profil />} />
</Routes>
*/

export default index;


/*

*/
