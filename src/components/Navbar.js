import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import M from  'materialize-css';

class Navbar extends React.Component {

  componentDidMount() {
    let sidenav = document.querySelectorAll('.sidenav')
    //console.log( "Sidenav", sidenav )
    M.Sidenav.init( sidenav, {
      edge: "left"
    } )
  }

  render() {
    return (
      <>
      <nav>
        <div className="nav-wrapper container nav-container black-text">
          <span className="left">
            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large">
              <i className="material-icons black-text">menu</i>
            </a>
          </span>
          <a className="right black-text" href="/">
            Good<span>Habits</span>
          </a>
          <Logout />
        </div>
      </nav>
      <div>
      <ul className="sidenav" id="slide-out">
        <li />
        <li><a href="/stories">Public Stories</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/rituals">Rituals</a></li>
        <li><NavLink exact to="/habits/"><a href="#">Habits</a></NavLink></li>
        <li><a href="/users">Users</a></li>
        <li><a href="/auth/logout">Logout</a></li>
      </ul>
      </div>
      </>
    );
  }
};


export default Navbar;
