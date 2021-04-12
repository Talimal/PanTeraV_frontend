import React, {useRef, useState} from 'react';
import './ExploreSymbol.css';
import SymbolRelationList from './SymbolRelationList';
import CenterSymbol from './CenterSymbol';
import ArrowButtons from './ArrowButtons';
import TirpMatrix from './TirpMatrix';

const ExploreSymbol = (props) => {
   
    // all fields are strings,jsons and primitives - not objects!
    const [tirp,setTirp] = useState(props.tirp);
    // these are strings of symbols, not objects!
    const [centerSymbol,setCenterSymbol] = useState(props.focusSymbol);
    const [centerSymbolRelations,setCenterSymbolRelations] = useState(tirp.getVectorInSize(tirp.getIndexOfSymbol(centerSymbol)));
    const [prefixSymbol,setPrefixSymbol] = useState(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)-1));
    const [nextSymbol,setNextSymbol] = useState(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)+1));
    const [nextSymbolRelations,setNextSymbolRelations] = useState(tirp.getVectorInSize(tirp.getIndexOfSymbol(centerSymbol)+1));
    const [prefixSymbolRelations,setPrefixSymbolRelations] = useState(tirp.getVectorInSize(tirp.getIndexOfSymbol(centerSymbol)-1));
    const [isClearPrefix,setIsClearPrefix] = useState(true);
    const [isClearNext,setIsClearNext] = useState(true);
    const nextTirps = useRef(props.getNextVectorTirps(centerSymbol,centerSymbolRelations));
    const prefixTirps = useRef(props.getPrevVectorTirps(centerSymbol,centerSymbolRelations));
   

    // tirpsJson is as follows: 
    // [253, <, c] -> [TIRP]
    //  which is a json that the key is a string : <symbol>,<relations>
    //  and the value is a list of all tirps that connect the current
    // center symbol to <symbol> to each other.
    //  the method creates a json :
    // key: <symbol> like 253 and value: [<relations>,<relations>] 
    // like [ [<,c], [<,<] ]
    // excluding and ignoring the tirps inside
    const getSymbolRelationsJson = (tirpsJson)=>{
        let symbolRelationsJson = {};
        for(var symbolRel in tirpsJson){
            const splitted = symbolRel.split(/[\s,[\]]+/);
            const cleanSplitted = splitted.filter(e=>e);
            const symbol = cleanSplitted[0];
            cleanSplitted.splice(0,1);
            // clean splitted now is relations array of symbol
            if(symbolRelationsJson.hasOwnProperty(symbol)){
                symbolRelationsJson[symbol].push(cleanSplitted);
            }
            else{
                symbolRelationsJson[symbol]=[cleanSplitted];
            }
        }
        return symbolRelationsJson;
    }
   
    const symbolRelNext = useRef(getSymbolRelationsJson(nextTirps.current));
    const symbolRelPrefix = useRef(getSymbolRelationsJson(prefixTirps.current));

    const getRelationsOfSymbol = (symbol,isPrefix)=>{
        const relations = isPrefix?symbolRelPrefix.current[symbol]:symbolRelNext.current[symbol];
        return relations;
    }
    
    // this method called when right/left (next/prefix) arrow is presses
    // the method updates the symbols according to the side we want
    // to move to and re-renders
    // this method uses the tirp value so i assume the tirp is
    // always up to date with the correct TIRP
    const arrowClicked = (isPrefix)=>{
        if(isPrefix){
            setNextSymbol(centerSymbol);
            setNextSymbolRelations(centerSymbolRelations);
            setCenterSymbol(prefixSymbol);
            setCenterSymbolRelations(prefixSymbolRelations);
            // assume the tirp is always updated
            setPrefixSymbol(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(prefixSymbol)-1));
            setPrefixSymbolRelations(tirp.getVectorInSize(prefixSymbolRelations.length-1));
            nextTirps.current = props.getNextVectorTirps(prefixSymbol,prefixSymbolRelations);
            symbolRelNext.current = getSymbolRelationsJson(nextTirps.current);
            prefixTirps.current = props.getPrevVectorTirps(prefixSymbol,prefixSymbolRelations);
            symbolRelPrefix.current = getSymbolRelationsJson(prefixTirps.current);
            setIsClearPrefix(true);
        }
        else{
            setPrefixSymbol(centerSymbol);
            setPrefixSymbolRelations(centerSymbolRelations);
            setCenterSymbol(nextSymbol);
            setCenterSymbolRelations(nextSymbolRelations);
            // assume the tirp is always updated
            setNextSymbol(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(nextSymbol)+1));
            setNextSymbolRelations(tirp.getVectorInSize(nextSymbolRelations.length+1))
            prefixTirps.current = props.getPrevVectorTirps(nextSymbol,nextSymbolRelations);
            symbolRelPrefix.current = getSymbolRelationsJson(prefixTirps.current);
            nextTirps.current = props.getNextVectorTirps(nextSymbol,nextSymbolRelations);
            symbolRelNext.current = getSymbolRelationsJson(nextTirps.current);
            setIsClearNext(true);
        }
    }

     // method checks if relations (array like [< <]) is in array relations
    // which is like [ [< <], [m c] ]
    const isRelationsExist = (arrayRelations,relations)=>{
        for(var index in arrayRelations){
            if (arrayRelations[index].toString() === relations.toString()){
                return true;
            }
        }
        return false;
    }

    const setNextComponents = (tirpsContainPrefix,prefixLength)=>{
        let nextSymbols = tirpsContainPrefix.map((tirp)=>tirp.getSymbolInIndex(prefixLength+2))
        let nextRelations = tirpsContainPrefix.map((tirp)=>tirp.getVectorInSize(prefixLength+2))
        
        // updatin the next components due to the tirpsArr
        symbolRelNext.current = {};
        for(var index=0; index<nextSymbols.length;index++){
            if (nextSymbols[index] !== null){
                // symbol is null if it is the end of the tirp
                if(symbolRelNext.current.hasOwnProperty(nextSymbols[index])){
                    if(!isRelationsExist(symbolRelNext.current[nextSymbols[index]],nextRelations[index])){
                        symbolRelNext.current[nextSymbols[index]].push(nextRelations[index]);
                    }
                }
                else{
                    symbolRelNext.current[nextSymbols[index]] = [nextRelations[index]];
                }
            }
        }
    }

   
    const setPrefixComponents = (tirpsContainNext,nextLength)=>{
        let prevSymbols = tirpsContainNext.map((tirp)=>tirp.getSymbolInIndex(nextLength-2))
        let prevRelations = tirpsContainNext.map((tirp)=>tirp.getVectorInSize(nextLength-2))
        
        // updating the prefix components due to the symbol that
        // was just clicked
        symbolRelPrefix.current = {};
        for(var index=0; index<prevSymbols.length;index++){
            if (prevSymbols[index]!==null){

                if(symbolRelPrefix.current.hasOwnProperty(prevSymbols[index])){
                    if(!isRelationsExist(symbolRelPrefix.current[prevSymbols[index]],prevRelations[index])){
                        symbolRelPrefix.current[prevSymbols[index]].push(prevRelations[index]);
                    }
                }
                else{
                    symbolRelPrefix.current[prevSymbols[index]] = [prevRelations[index]];
                }
            }
        }
    }
    // this method is called then one of the symbol tables components
    // are pressed
    const symbolClicked = (symbol,relations,isPrefix)=>{
                
        if(isPrefix){
            // array of all tirps that contains the prefix symbol that
            // was just clicked
            let tirpsArr = prefixTirps.current["["+symbol+","+relations+"]"];
            setPrefixSymbol(symbol);
            setPrefixSymbolRelations(relations);
             // prefix is pressed and no longer clear
             setIsClearPrefix(false);
            if(isClearNext){
                // if the symbol that was pressed is a prefix one
                // and also the next symbols are all clear and
                // no one is pressed yet:
                // update the next components to all that come
                // after the center symbol but connected to the tirps
                // that contains the prefix symbol was pressed
                setNextComponents(tirpsArr,relations.length);
                // setting a default tirp
                setTirp(tirpsArr[0]);
            }
            else{
                // the symbol that was pressed is a prefix one
                // and (!) a next component is already pressed
                // we need to update the tirp object to be the first
                // tirp (default) that contains both pressed symbols
                // and center symbol
                for(var index=0; index<tirpsArr.length;index++){
                    if(tirpsArr[index].getSymbolInIndex(relations.length+2)===nextSymbol){
                        // choosing a default tirp with the data we have
                        setTirp(tirpsArr[index]);
                    }
                }
            }
        }
        else{
            // next symbol pressed
            let tirpsArr = nextTirps.current["["+symbol+","+relations+"]"];
            setNextSymbol(symbol);
            setNextSymbolRelations(relations);
             // next is pressed and no longer clear
             setIsClearNext(false);
            if(isClearPrefix){
                // if the symbol that was pressed is a next one
                // and also the prefix symbols are all clear and
                // no one is pressed yet:
                // update the prefix components to all that come
                // after the center symbol but connected to the tirps
                // that contains the next symbol was pressed
                setPrefixComponents(tirpsArr,relations.length);
                // default tirp
                setTirp(tirpsArr[0]);
            }
            else{
                // the symbol that was pressed is a next one
                // and (!) a prefix component is already pressed
                // we need to update the tirp object to be the first
                // tirp (default) that contains both pressed symbols
                // and center symbol
                for(index=0; index<tirpsArr.length;index++){
                    if(tirpsArr[index].getSymbolInIndex(relations.length-2)===prefixSymbol){
                        setTirp(tirpsArr[index]);
                    }
                }
            }
        }
    }

    // method called then 'clear all' button is pressed
    // the method unmarks the component that was pressed before
    const handleClearClick = (isPrefix)=>{

        if(isPrefix){
            setPrefixSymbol(null);
            setIsClearPrefix(true);
            if(isClearNext){
                symbolRelPrefix.current = getSymbolRelationsJson(prefixTirps.current);
                symbolRelNext.current = getSymbolRelationsJson(nextTirps.current);
            }
            else{
                // want to clear prefix and next is pressed -> prefix is set according to next
                let tirpsArr = nextTirps.current["["+nextSymbol+","+nextSymbolRelations+"]"];
                setPrefixComponents(tirpsArr,nextSymbolRelations.length);
            }
        }
        else{
            setNextSymbol(null);
            setIsClearNext(true);

            if(isClearPrefix){
                symbolRelNext.current = getSymbolRelationsJson(nextTirps.current);
                symbolRelPrefix.current = getSymbolRelationsJson(prefixTirps.current);
            }
            else{
                let tirpsArr = prefixTirps.current["["+prefixSymbol+","+prefixSymbolRelations+"]"];
                setNextComponents(tirpsArr,prefixSymbolRelations.length);
            }
    }
}

    return (
        <div>
        <div className="exploreScreen">
            <div className="TIRP">
                <h1>Tirp: {tirp.printSymbols()}</h1>
                <h1>Relations: {tirp.printRelations()}</h1>
            </div>
            <div className="symbols">
               
                <div className="beforeSymbols">
                    <div className="arrows">
                        <ArrowButtons
                        isPrefix={true}
                        arrowClicked={()=>arrowClicked(true)}
                        />
                    </div>
                    <button className="clearBtn" onClick={()=>handleClearClick(true)}>
                        Clear All
                    </button>
                    <SymbolRelationList
                        className="symbolRelList"
                        symbolRelations = {symbolRelPrefix.current}
                        symbols = {Object.keys(symbolRelPrefix.current)}
                        getRelationsOfSymbol={getRelationsOfSymbol}
                        isPrefix={true}
                        // defaultSymbol={prefixSymbol}
                        // defaultRelations={prefixSymbolRelations}
                        symbolClicked={symbolClicked}
                        needToClear={isClearPrefix}
                    />
                    
                </div>
                <div className="centerSymbol">
                    <CenterSymbol
                        symbol={centerSymbol}
                        relationsVector={centerSymbolRelations}
                    />
                </div>
                <div className="afterSymbols">
                    <div className="arrows">
                        <ArrowButtons
                        isPrefix={false}
                        arrowClicked={()=>arrowClicked(false)}
                        />
                    </div>
                     <button className="clearBtn" onClick={()=>handleClearClick(false)}>
                        Clear All
                    </button>
                    <SymbolRelationList
                        className="symbolRelList"
                        symbolRelations={symbolRelNext.current}
                        symbols = {Object.keys(symbolRelNext.current)}
                        getRelationsOfSymbol={getRelationsOfSymbol}
                        isPrefix={false}
                        // defaultSymbol={nextSymbol}
                        // defaultRelations={nextSymbolRelations}
                        symbolClicked={symbolClicked}
                        needToClear={isClearNext}
                    />
                </div>
            </div>
            <div className="matrix">
                <TirpMatrix
                tirp={tirp}
                />
            </div>
        </div>
        </div>
    );
  }
  
  export default ExploreSymbol;