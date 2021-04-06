import React, {useState} from 'react';
import './ExploreSymbol.css';
import SymbolRelationList from './SymbolRelationList';
import CenterSymbol from './CenterSymbol';
import ArrowButtons from './ArrowButtons';

const ExploreSymbol = (props) => {
   
    // all fields are strings,jsons and primitives - not objects!
    const [tirp,setTirp] = useState(props.tirp);
    const [centerSymbol,setCenterSymbol] = useState(props.focusSymbol);
    const [prefixSymbol,setPrefixSymbol] = useState(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)-1));
    const [nextSymbol,setNextSymbol] = useState(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)+1));
    const [isClearPrefix,setIsClearPrefix] = useState(true);
    const [isClearNext,setIsClearNext] = useState(true);
    const symbolRelations = tirp.getVectorInSize(tirp.getIndexOfSymbol(centerSymbol));
    const nextTirps = props.getNextVectorTirps(centerSymbol,symbolRelations);
    const prevTirps = props.getPrevVectorTirps(centerSymbol,symbolRelations);


    // tirpsJson is as follows: 
    // [253, <, c] -> [TIRP]
    //  which is a json that the key is a string : <symbol>,<relations>
    //  and the value is a list of all tirps that connect the current
    // center symbol to <symbol> to each other.
    //  the method creates a json :
    // key: <symbol> like 253 and value: <relations> like [<,c]
    // excluding and ignoring the tirps inside
    const getSymbolRelationsJson = (tirpsJson)=>{
        let symbolRelationsJson = {};
        for(var symbolRel in tirpsJson){
            const splitted = symbolRel.split(/[\s,[\]]+/);
            const cleanSplitted = splitted.filter(e=>e);
            const symbol = cleanSplitted[0];
            cleanSplitted.splice(0,1);
            // clean splitted now is relations array of symbol
            symbolRelationsJson[symbol]=cleanSplitted;
        }
        return symbolRelationsJson;
    }
    let symbolRelPrefix = getSymbolRelationsJson(prevTirps);
    let symbolRelNext = getSymbolRelationsJson(nextTirps);


    const getRelationsOfSymbol = (symbol,isPrefix)=>{
        const relations = isPrefix?symbolRelPrefix[symbol]:symbolRelNext[symbol];
        return relations;
    }
    
    // this method called when right/left (next/prefix) arrow is presses
    // the method updates the symbols according to the side we want
    // to move to and re-renders
    // this method uses the tirp value so i assume the tirp is
    // always up to date with the correct TIRP
    const arrowClicked = (isPrefix)=>{
        if(isPrefix){
            setNextSymbol(centerSymbol)
            setCenterSymbol(prefixSymbol);
            // assume the tirp is always updated
            setPrefixSymbol(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)-1));
        }
        else{
            setPrefixSymbol(centerSymbol);
            setCenterSymbol(nextSymbol);
            // assume the tirp is always updated
            setNextSymbol(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)+1))

        }
    }

    // this method is called then one of the symbol tables components
    // are pressed
    const symbolClicked = (symbol,isPrefix)=>{
        const symbolRelations = getRelationsOfSymbol(symbol,isPrefix);
        const vector = props.getSymbolVector(symbol,symbolRelations);
        const relationsLength = symbolRelations.length;

        
        if(isPrefix){
            let tirpsArr = prevTirps["["+symbol+","+symbolRelations+"]"];
            if(isClearNext){
                // if the symbol that was pressed is a prefix one
                // and also the next symbols are all clear and
                // no one is pressed yet:
                // update the next components to all that come
                // after the center symbol but connected to the tirps
                // that contains the prefix symbol was pressed
                let nextSymbols = tirpsArr.map((tirp)=>tirp.getSymbolInIndex(relationsLength+2))
                let nextRelations = tirpsArr.map((tirp)=>tirp.getVectorInSize(relationsLength+2))
                for(var index=0; index<nextSymbols.length;index++){
                    symbolRelNext[nextSymbols[index]] = nextRelations[index];
                }
                setTirp(tirpsArr[0]);
            }
            else{
                // the symbol that was pressed is a prefix one
                // and (!) a next component is already pressed
                // we need to update the tirp object to be the first
                // tirp (default) that contains both pressed symbols
                // and center symbol
                for(var index=0; index<tirpsArr.length;index++){
                    if(tirpsArr[index].getSymbolInIndex(relationsLength+2)===nextSymbol.symbol){
                        setTirp(tirpsArr[index]);
                    }
                }
            }
            setPrefixSymbol(symbol);
            // prefix is pressed and no longer clear
            setIsClearPrefix(false);
        }
        else{
            // next symbol pressed
            let tirpsArr = nextTirps["["+symbol+","+symbolRelations+"]"];
            if(isClearPrefix){
                // if the symbol that was pressed is a next one
                // and also the prefix symbols are all clear and
                // no one is pressed yet:
                // update the prefix components to all that come
                // after the center symbol but connected to the tirps
                // that contains the next symbol was pressed
                let prevSymbols = tirpsArr.map((tirp)=>tirp.getSymbolInIndex(relationsLength-2))
                let prevRelations = tirpsArr.map((tirp)=>tirp.getVectorInSize(relationsLength-2))
                for(var index=0; index<prevSymbols.length;index++){
                    symbolRelPrefix[prevSymbols[index]] = prevRelations[index];
                }
                setTirp(tirpsArr[0]);
            }
            else{
                // the symbol that was pressed is a next one
                // and (!) a prefix component is already pressed
                // we need to update the tirp object to be the first
                // tirp (default) that contains both pressed symbols
                // and center symbol
                for(var index=0; index<tirpsArr.length;index++){
                    if(tirpsArr[index].getSymbolInIndex(relationsLength-2)===prefixSymbol.getSymbol()){
                        setTirp(tirpsArr[index]);
                    }
                }
            }
            setNextSymbol(vector.symbol);
            // next is pressed and no longer clear
            setIsClearNext(false);
        }
    }

    // method called then 'clear all' button is pressed
    // the method unmarks the component that was pressed before
    const handleClearClick = (isPrefix)=>{
        if(isPrefix){
            setPrefixSymbol(null);
            setIsClearPrefix(true);

        }
        else{
            setNextSymbol(null);
            setIsClearNext(true);
        }
    }

    return (
        <div>
        <div className="exploreScreen">
            <div className="TIRP">
                <h1>{tirp.printSymbols()}</h1>
                <h1>{tirp.printRelations()}</h1>
            </div>
            <div className="symbols">
               
                <div className="beforeSymbols">
                    
                    <ArrowButtons
                    isPrefix={true}
                    arrowClicked={()=>arrowClicked(true)}
                    />
                    <button onClick={()=>handleClearClick(true)}>
                        Clear All
                    </button>
                    <SymbolRelationList
                        symbols = {Object.keys(symbolRelPrefix)}
                        getRelationsOfSymbol={getRelationsOfSymbol}
                        isPrefix={true}
                        // default={prefixSymbol}
                        symbolClicked={symbolClicked}
                        needToClear={isClearPrefix}
                    />
                    
                </div>
                <div className="centerSymbol">
                    <CenterSymbol
                        symbol={centerSymbol}
                        relationsVector={symbolRelations}
                    />
                </div>
                <div className="afterSymbols">
                       
                    <ArrowButtons
                    isPrefix={false}
                    arrowClicked={()=>arrowClicked(false)}
                    />
                     <button onClick={()=>handleClearClick(false)}>
                        Clear All
                    </button>
                    <SymbolRelationList
                        symbols = {Object.keys(symbolRelNext)}
                        getRelationsOfSymbol={getRelationsOfSymbol}
                        isPrefix={false}
                        // default={nextSymbol}
                        symbolClicked={symbolClicked}
                        needToClear={isClearNext}
                    />
                </div>
            </div>
        </div>
        </div>
    );
  }
  
  export default ExploreSymbol;