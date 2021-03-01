import React, { useState } from 'react';
import './MainButtons.css';
import up_not_hover from "../images/arrow-up.jpg";
import up_hover from "../images/arrow-up-hover.jpg";
import down_not_hover from "../images/arrow-down.png";
import down_hover from "../images/arrow-down-hover.png";



const MainButtons = (props) => {

    const [hoverup,setHoverUp] = useState(false);
    const [hoverdown,setHoverDown] = useState(false);


    const notPresented = props.notPresented

    const handleClickPrevious = ()=>{
        return props.handleClickPrevious()
    }


    const canShowPrevious = ()=>{
        return props.canShowPrevious()
    }


  return (
        <div className="buttons">
            <button 
                onClick={handleClickPrevious}
                disabled={canShowPrevious()===false}>
                Previous
            </button>
        </div>
  );
}

export default MainButtons;