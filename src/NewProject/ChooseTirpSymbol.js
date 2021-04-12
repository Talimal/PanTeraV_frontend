import React ,{ useState} from 'react';
import ExploreSymbol from './ExploreSymbol';
import './ChooseTirpSymbol.css';
import * as ReactBootstrap from 'react-bootstrap';
import Select from "react-dropdown-select";



const ChooseTirpSymbol = (props) => {

    const [symbols,setSymbols] = useState([]);
    const tirps = props.tirps;
    const [tirpChosen,setTirpChosen] = useState(false);
    const [tirpFocus,setTirpFocus] = useState(null);
    const [symbolFocus,setSymbolFocus] = useState(null);

    const createOptionSymbols = (symbols)=>{
        let optionsSymbols = [];
        for(var index in symbols){
            optionsSymbols.push({
                value:
                    symbols[index],
                label:
                    symbols[index]})
        }
    return optionsSymbols;
    }

    const handleDropDownTirps = (e)=>{
        const tirpSymbols = e[0].label;
        let symbols = tirpSymbols.split(/[-]+/);
        setSymbols(createOptionSymbols(symbols));
        setTirpFocus(props.getTirpBySymbols(symbols));
        setTirpChosen(true);

    }
    const handleDropDownSymbols = (e)=>{
        const focusSymbol = e[0].value;
        setSymbolFocus(focusSymbol);

    }

    const handleClick = ()=>{
        setSymbols(symbols);
        setTirpFocus(props.getTirpBySymbols(symbols));
        setTirpChosen(true);
    }

    let optionsTirps = [];
    for(var index in tirps){
        optionsTirps.push({
            value:
                tirps[index].printSymbols()+" : "+tirps[index].printRelations(),
            label:
                tirps[index].printSymbols()})
    }

    
   
    return (
        <div>
            <Select 
                className="tirpSelect"
                onChange={(e)=>handleDropDownTirps(e)}
                options={optionsTirps}
            />

            {tirpChosen?
                <Select 
                className="symbolSelect"
                onChange={(e)=>handleDropDownSymbols(e)}
                options={symbols}
                />
            :null} 

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