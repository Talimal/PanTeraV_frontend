import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainMenu.css'


const MainMenu = (props) => {


  return (
    <div className="mainPage">
      <div className="nav-bar">
        <nav className="nav-bar-main">
            <NavLink to="/"> Upload Data </NavLink>
            <NavLink to="/TreeView"> Tree View </NavLink>
            <NavLink to="/graphs"> graphs </NavLink>
            <NavLink to="/TreeView"> info </NavLink>

        </nav>
     </div>
     </div>
  );
}

export default MainMenu;