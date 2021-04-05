import React, { useRef, useState } from 'react';
import './ArrowButtons.css'
import arrowImg from "./arrow.jpg";
import greenArrowImg from "./greenArrow.png";
import redArrowImg from "./redArrow.png";



const ArrowButtons = (props) => {

    const className=useRef(props.isPrefix?"prefixArrow":"nextArrow");


  return (
      <div className={className.current}>
        <img 
            src={arrowImg} 
            alt=""
            onClick = {props.arrowClicked}
            >
        </img>
    </div>
  );
}

export default ArrowButtons;