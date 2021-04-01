import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './ExploreSymbol.css';
import SymbolRelationTable from './SymbolRelationTable';

const ExploreSymbol = (props) => {
   
    const tirp = props.tirp;
    const symbol = tirp.getSymbols()[1];
    /**
     * @todo ask for the boys to transfer me a tirp and a symbol 
     * and it's relations to focus on.
     */ 
    // const symbolToFocus = props.symbolToFocus;
    const symbolRelations = tirp.getVectorInSize(1);
    const nextTirps = props.getNextVectorTirps(symbol,symbolRelations);
    const prevTirps = props.getPrevVectorTirps(symbol,symbolRelations);


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
   


    return (
        <div>
        <div className="exploreScreen">
            <div className="TIRP">
                <h1>{tirp.printSymbols()}</h1>
                <h1>{tirp.printRelations()}</h1>
            </div>
            <div className="symbols">
                <div className="beforeSymbols">
                    <button>
                        Clear
                    </button>
                    <SymbolRelationTable
                        symbols = {Object.keys(symbolRelPrefix)}
                        getRelationsOfSymbol={getRelationsOfSymbol}
                        isPrefix={true}
                    />
                    
                </div>
                <div className="centerSymbol">
                    <ReactBootstrap.Table className="table table-bordered" style={{'background':'transparent'}} striped bordered hover>
                        <thead className="thead-dark">
                            <tr>
                                 {/** 
                                     * @todo: should be chosen vector
                                     * 
                                    */}
                                <th>Symbol: {symbol}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="data-table-row">
                                <td>
                                    {/** 
                                     * @todo: should be chosen vector
                                     * 
                                    */}
                                    {tirp.getVectorInSize(1)}
                                </td>
                            </tr>
                        </tbody>
                    </ReactBootstrap.Table>
                </div>
                <div className="afterSymbols">
                    <button>
                        Clear
                    </button>
                    <SymbolRelationTable
                        symbols = {Object.keys(symbolRelNext)}
                        getRelationsOfSymbol={getRelationsOfSymbol}
                        isPrefix={false}
                    />
                </div>
            </div>
        </div>
        </div>
    );
  }
  
  export default ExploreSymbol;