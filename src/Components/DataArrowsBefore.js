import React from 'react';
import arrow_1 from "../images/arrow-after-2.png";
import './DataArrowsBefore.css';



const dataArrowsAfter = (props) => {


  return (
      <div className="arrow-buttons-before">
        <img 
            className="arrow_before_1"
            src={arrow_1} 
            alt=""
        >
        </img>
        <img 
            className="arrow_before_2"
            src={arrow_1} 
            alt=""
         >
        </img>
        <img 
            className="arrow_before_3"
            src={arrow_1} 
            alt=""
         >
        </img>
    </div>
  );
}

export default dataArrowsAfter;