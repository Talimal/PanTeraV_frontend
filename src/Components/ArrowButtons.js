import React, { useState } from 'react';
import up_not_hover from "../images/arrow-up.jpg";
import up_hover from "../images/arrow-up-hover.jpg";
import down_not_hover from "../images/arrow-down.png";
import down_hover from "../images/arrow-down-hover.png";
import './ArrowButtons.css'



const ArrowButtons = (props) => {

    const [hoverup,setHoverUp] = useState(false);
    const [hoverdown,setHoverDown] = useState(false);


    const canShowPrevChildren = ()=>{
        return props.canShowPrevChildren()
    }

    const canShowMoreChildren = ()=>{
        return props.canShowMoreChildren()
    }

    const handleClickMore=()=>{
        return props.handleClickMore()
    }

    const handleClickLess=()=>{
        return props.handleClickLess()
    }
 

  return (
      <div className="arrow-buttons">
        <img 
            className="arrow_up"
            src={hoverup===false?up_not_hover:up_hover} 
            alt=""
            onClick={handleClickLess}
            onMouseOver={()=>
                canShowPrevChildren()===true?
                    setHoverUp(true):
                    null} 
            onMouseOut={()=>setHoverUp(false)}>
        </img>
        <img 
            className="arrow_down"
            src={hoverdown===false?down_not_hover:down_hover} 
            alt=""
            onClick={handleClickMore}
            onMouseOver={()=>
                canShowMoreChildren()===true?
                    setHoverDown(true):
                    null}
            onMouseOut={()=>setHoverDown(false)} >
        </img>
    </div>
  );
}

export default ArrowButtons;