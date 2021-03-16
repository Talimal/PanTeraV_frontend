import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainMenu.css';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {FcTreeStructure,FcBarChart,FcInfo} from 'react-icons/fc';
import {GoGraph} from 'react-icons/go';
import {BsFillInfoCircleFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";

const MainMenu = (props) => {

  const iconSize=80;
  const history = useHistory();
  let redirect = function(toWhere){
      history.push({pathname: "/"+toWhere})
  };

  return (
    <div className="mainPage">
        <nav className="nav-bar-main">
          <div className="nav-bar-div">
            <div className="UploadData">
              <AiOutlineFileAdd size={iconSize} style={{"cursor":"pointer"}} onClick={()=>redirect("UploadData")}/>
              <NavLink to="/"> 
                Upload Data 
              </NavLink>
            </div>
            <div className="TreeView">
              <FcTreeStructure size={iconSize} style={{"cursor":"pointer"}} onClick={()=>redirect("TreeView")}/>
              <NavLink to="/TreeView"> 
                Tree View 
              </NavLink>
            </div>
            <div className="graphs">
              <FcBarChart size={iconSize} style={{"cursor":"pointer"}} onClick={()=>alert("Choose TIRP first")}/>
              <NavLink to="/graphs"> 
                Graphs 
              </NavLink>
            </div>
            <div className="info">
              <FcInfo size={iconSize} style={{"cursor":"pointer"}} onClick={()=>redirect("TreeView")}/>
              <NavLink to="/TreeView">
                Information 
              </NavLink>
            </div>
          </div>
        </nav>
     </div>
  
  );
}

export default MainMenu;