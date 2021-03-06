import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainMenu.css'
import graphs from '../images/graphs.jpg';
import data from '../images/data.png';
import tree from '../images/tree.png';
import info from '../images/info.png';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {FcTreeStructure} from 'react-icons/fc';
import {GoGraph} from 'react-icons/go';
import {BsFillInfoCircleFill} from 'react-icons/bs';

const MainMenu = (props) => {

  const iconSize=90;

  return (
    <div className="mainPage">
        <nav className="nav-bar-main">
          <div className="nav-bar-div">
            <div className="UploadData">
              <AiOutlineFileAdd size={iconSize}/>
              <NavLink to="/"> 
                {/* <img src={data}/> */}
                Upload Data 
              </NavLink>
            </div>
            <div className="TreeView">
              <FcTreeStructure size={iconSize}/>
              <NavLink to="/TreeView"> 
                {/* <img src={tree}/> */}
                Tree View 
              </NavLink>
            </div>
            <div className="graphs">
              <GoGraph size={iconSize}/>
              <NavLink to="/graphs"> 
                {/* <img src={graphs}/> */}
                Graphs 
              </NavLink>
            </div>
            <div className="info">
              <BsFillInfoCircleFill size={iconSize}/>
              <NavLink to="/TreeView">
                {/* <img src={info}/> */}
                Information 
              </NavLink>
            </div>
          </div>
        </nav>
     </div>
  );
}

export default MainMenu;