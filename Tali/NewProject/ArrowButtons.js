import React, { useRef, useState } from 'react';
import './ArrowButtons.css'
import arrowImg from "./arrow.jpg";
import greenArrowImg from "./greenArrow.png";
import redArrowImg from "./redArrow.png";



const ArrowButtons = (props) => {

    const className=useRef(props.isPrefix?"prefixArrow":"nextArrow");


  return (
      <div className={className.current}>
        {/* <img 
            src={arrowImg} 
            alt=""
            onClick = {props.arrowClicked}
            style={{'color':'red'}}
            >
        </img> */}
        <a className={className.current} onClick={props.arrowClicked}></a>
    </div>
  );
}

export default ArrowButtons;