import React from 'react';
import MainMenu from './MainMenu';
import { useHistory } from "react-router-dom";



const Graphs = (props) => {

    let history=useHistory();
    const handleClick = ()=>{
    }

    return (
        <button onClick={handleClick}>
            Back
        </button>
       
      );
 
}

export default Graphs;