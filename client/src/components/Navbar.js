import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import M from  'materialize-css';

class Navbar extends React.Component {

  componentDidMount() {
    let sidenav = document.getElementById('slide-out')
    M.Sidenav.init( sidenav, {
      edge: "left"
    } )
  }

  render() {
    return (
      <>
      <nav>
        <div className="nav-wrapper container nav-container">
          <span className="left">
            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large">
              <i className="material-icons">menu</i>
            </a>
          </span>
          <a className="right" href="/">
            Good<span>Habits</span>
          </a>
          <Logout />
        </div>
      </nav>
      <div>
      <ul className="sidenav sidenav-close" id="slide-out">
        <li />
        <li><NavLink exact="true" to="/">Home</NavLink></li>
        <li><NavLink exact="true" to="/Profil">Profil</NavLink></li>
        <li><NavLink exact="true" to="/Admin/Habits">Habits</NavLink></li>
        <li><a href="/auth/logout">Logout</a></li>
      </ul>
      </div>
      </>
    );
  }
};


export default Navbar;
