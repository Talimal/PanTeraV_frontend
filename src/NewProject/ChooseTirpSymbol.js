import React ,{useEffect, useState, useRef} from 'react';
import Chartjs from 'chart.js';
import {useLocation} from 'react-router-dom';
import ExploreSymbol from './ExploreSymbol';
import './ChooseTirpSymbol.css';


const ChooseTirpSymbol = (props) => {

    const [symbols,setSymbols] = useState([]);
    const tirps = props.tirps;
    const [tirpChosen,setTirpChosen] = useState(false);
    const [tirpFocus,setTirpFocus] = useState(null);
    const [symbolFocus,setSymbolFocus] = useState(null);

    const handleDropDownTirps = (e)=>{
        const tirpSymbols = e.target.value;
        let symbols = tirpSymbols.split(/[-]+/);
        setSymbols(symbols);
        setTirpFocus(props.getTirpBySymbols(symbols));
        setTirpChosen(true);

    }
    const handleDropDownSymbols = (e)=>{
        const focusSymbol = e.target.value;
        setSymbolFocus(focusSymbol);

    }

    const handleClick = ()=>{
        setSymbols(symbols);
        setTirpFocus(props.getTirpBySymbols(symbols));
        setTirpChosen(true);
    }
  
   
    return (
        <div>
            <select className="tirpSelect" onChange={handleDropDownTirps}>
                 {tirps.map((tirp,index)=>{
                     return (<option key={index} 
                                         value={tirp.printSymbols()}
                                         onChange={(e)=>handleDropDownTirps(e)}
                                         onClick={(e)=>handleDropDownTirps(e)}
                                         >{tirp.printSymbols()}</option>
                 )})}
             </select>

             {tirpChosen?
             <select className="symbolSelect" onChange={handleDropDownSymbols} >
                 {symbols.map((symbol,index)=>{
                     return (<option key={index} 
                                         value={symbol}
                                         onChange={(e)=>handleDropDownSymbols(e)}
                                         onClick={(e)=>handleDropDownSymbols(e)}
                                         >{symbol}</option>
                 )})}
             </select>
            :null}

            <button onClick={handleClick}>Click</button>
            {tirpFocus!==null && symbolFocus!==null?
             <ExploreSymbol 
                tirp={tirpFocus} 
                focusSymbol={symbolFocus} 
                getNextVectorTirps={props.getNextVectorTirps}
                getPrevVectorTirps={props.getPrevVectorTirps}
                getSymbolVector={props.getSymbolVector}
                getAllTirps={props.getAllTirps}
          />
            :null}
      </div>
      );
 
}

export default ChooseTirpSymbol;