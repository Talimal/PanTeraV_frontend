import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './SymbolRelationList.css';
import { ScrollView ,ScrollObserver} from "@cantonjs/react-scroll-view";
import SymbolRelationComponent from './SymbolRelationComponent';


const SymbolRelationList = (props) => {

    // marked symbol is the component that pressed at the moment
    const [markedSymbol,setMarkedSymbol] = useState(props.needToClear?null:props.defaultSymbol);
    const [markedRelations,setMarkedRelations] = useState(props.needToClear?null:props.defaultRelations);


    // component from the component's list was pressed
    const handleSymbolClicked = (symbol,relations,isPrefix)=>{
        setMarkedSymbol(symbol);
        setMarkedRelations(relations)
        props.symbolClicked(symbol,relations,isPrefix)
    }
    return (
        <div>
            <ScrollView style={{ height: '500px' }}>
                <ul className="list">
                    {Object.keys(props.symbolRelations).map((symbol,i) => {
                        return (
                            props.symbolRelations[symbol].map((relations,j) => {
                            return (
                                    <li key={i,j}>
                                    <SymbolRelationComponent
                                    getRelationsOfSymbol={props.getRelationsOfSymbol}
                                    symbol={symbol}
                                    relations={relations}
                                    isPrefix={props.isPrefix}
                                    isMarked = {markedSymbol===symbol && markedRelations.toString()===relations.toString()}
                                    symbolClicked={()=>handleSymbolClicked(symbol,relations,props.isPrefix)}
                                    needToClear={props.needToClear}
                                    />
                                    </li>
                                )
                        }
                    ))})}
                </ul>
            </ScrollView>
 
    </div>
    )     
}

export default SymbolRelationList;