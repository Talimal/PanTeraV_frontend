import React, { useState } from 'react';
import './MainButtons.css';



const MainButtons = (props) => {



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
                // disabled={canShowPrevious()===false}
                >
                Previous
            </button>
        </div>
  );
}

export default MainButtons;