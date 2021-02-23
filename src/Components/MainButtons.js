import React from 'react';
import './MainButtons.css';


const MainButtons = (props) => {

    const notPresented = props.notPresented

    const handleClickPrevious = ()=>{
        return props.handleClickPrevious()
    }

    const canShowPrevChildren = ()=>{
        return props.canShowPrevChildren()
    }

    const canShowPrevious = ()=>{
        return props.canShowPrevious()
    }

    const handleClickMore=()=>{
        return props.handleClickMore()
    }

    const handleClickLess=()=>{
        return props.handleClickLess()
    }

  return (
    <div className="buttons">
    <button onClick={handleClickPrevious}
    disabled={canShowPrevious()===false}>
        Previous
    </button>
    <button  onClick={handleClickMore} 
        disabled={notPresented.current.length===0}>
        Show more
    </button>
    <button onClick={handleClickLess}
        disabled={canShowPrevChildren()===false}>
        Show less
    </button>

</div>
  );
}

export default MainButtons;