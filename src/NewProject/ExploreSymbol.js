import React, {useState} from 'react';
import './ExploreSymbol.css';
import SymbolRelationTable from './SymbolRelationTable';
import CenterSymbol from './CenterSymbol';
import ArrowButtons from './ArrowButtons';

const ExploreSymbol = (props) => {
   
    const [tirp,setTirp] = useState(props.tirp);
    const [centerSymbol,setCenterSymbol] = useState(props.focusSymbol);
    const [prefixSymbol,setPrefixSymbol] = useState(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)-1));
    const [nextSymbol,setNextSymbol] = useState(tirp.getSymbolInIndex(tirp.getIndexOfSymbol(centerSymbol)+1));
    const [isClearPrefix,setIsClearPrefix] = useState(false);
    const [isClearNext,setIsClearNext] = useState(false);
    const symbolRelations = tirp.getVectorInSize(tirp.getIndexOfSymbol(centerSymbol));
    const nextTirps = props.getNextVectorTirps(centerSymbol,symbolRelations);
    const prevTirps = props.getPrevVectorTirps(centerSymbol,symbolRelations);


    const getSymbolRelationsJson = (tirpsJson)=>{
        let symbolRelationsJson = {};
        for(var symbolRel in tirpsJson){
            const splitted = symbolRel.split(/[\s,[\]]+/);
            const cleanSplitted = splitted.filter(e=>e);
            const symbol = cleanSplitted[0];
            cleanSplitted.splice(0,1);
            symbolRelationsJson[symbol]=cleanSplitted;
        }
        return symbolRelationsJson;
    }
    let symbolRelPrefix = getSymbolRelationsJson(prevTirps);
    let symbolRelNext = getSymbolRelationsJson(nextTirps);


    const getRelationsOfSymbol = (symbol,isPrefix)=>{
        return isPrefix?symbolRelPrefix[symbol]:symbolRelNext[symbol];
    }
   
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

    const symbolClicked = (symbol,isPrefix)=>{
        const symbolRelations = getRelationsOfSymbol(symbol,isPrefix);
        const vector = props.getSymbolVector(symbol,symbolRelations);
        const prefixRelationSize = symbolRelations.length;

        if(isPrefix){
            if(isClearNext){
                let tirpsArr = prevTirps["["+symbol+","+symbolRelations+"]"];
                let nextSymbols = tirpsArr.map((tirp)=>tirp.getSymbolInIndex(prefixRelationSize+2))
                let nextRelations = tirpsArr.map((tirp)=>tirp.getVectorInSize(prefixRelationSize+2))
                for(var index=0; index<nextSymbols.length;index++){
                    symbolRelPrefix[nextSymbols[index]] = nextRelations[index];
                }
                setPrefixSymbol(vector);
                setTirp(tirpsArr[0]);
                setIsClearPrefix(false);
            }

        }
        else{
            if(isClearPrefix){
                let tirpsArr = nextTirps["["+symbol+","+symbolRelations+"]"];
                let prevSymbols = tirpsArr.map((tirp)=>tirp.getSymbolInIndex(prefixRelationSize-2))
                let prevRelations = tirpsArr.map((tirp)=>tirp.getVectorInSize(prefixRelationSize-2))
                for(var index=0; index<prevSymbols.length;index++){
                    symbolRelNext[prevSymbols[index]] = prevRelations[index];
                }
                setNextSymbol(vector);
                setTirp(tirpsArr[0]);
                setIsClearNext(false);
            }
        }
    }

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
                    <SymbolRelationTable
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
                        relationsVector={tirp.getRelationsOfSymbol(centerSymbol)}
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
                    <SymbolRelationTable
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