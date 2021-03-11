import React from 'react';
import arrow_1 from "../images/arrow-after-2.png";
import './DataArrowsAfter.css';



const dataArrowsAfter = (props) => {


  return (
      <div className="arrow-buttons-after">
        <img 
            className="arrow_after_1"
            src={arrow_1} 
            alt=""
        >
        </img>
        <img 
            className="arrow_after_2"
            src={arrow_1} 
            alt=""
         >
        </img>
        <img 
            className="arrow_after_3"
            src={arrow_1} 
            alt=""
         >
        </img>
    </div>
  );
}

export default dataArrowsAfter;