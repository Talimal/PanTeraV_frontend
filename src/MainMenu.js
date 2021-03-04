import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainMenu.css'
import graphs from './images/graphs.jpg';
import data from './images/data.png';
import tree from './images/tree.png';
import info from './images/info.png';

const MainMenu = (props) => {


  return (
    <div className="mainPage">
        <nav className="nav-bar-main">
          <div className="nav-bar-div">
            <div>
              <NavLink to="/"> 
                <img src={data}/>
                Upload Data 
              </NavLink>
            </div>
            <div>
              <NavLink to="/TreeView"> 
                <img src={tree}/>
                Tree View 
              </NavLink>
            </div>
            <div className="graphs">
              <NavLink to="/graphs"> 
                <img src={graphs}/>
                graphs 
              </NavLink>
            </div>
            <div>
              <NavLink to="/TreeView">
                <img src={info}/>
                info 
              </NavLink>
            </div>
          </div>
        </nav>
     </div>
  );
}

export default MainMenu;