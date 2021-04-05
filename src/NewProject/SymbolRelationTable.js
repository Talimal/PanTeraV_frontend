import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './SymbolRelationTable.css';
import { ScrollView ,ScrollObserver} from "@cantonjs/react-scroll-view";
import SymbolRelationComponent from './SymbolRelationComponent';


const SymbolRelationTable = (props) => {

    const [markedSymbol,setMarkedSymbol] = useState(props.needToClear?null:props.default);

    const handleSymbolClicked = (symbol,isPrefix)=>{
        setMarkedSymbol(symbol);
        props.symbolClicked(symbol,isPrefix)
    }
    return (
        <div>
            <ScrollView style={{ height: '500px' }}>
                <ul className="list">
                    {props.symbols.map((symbol,index) => {
                        return (
                                <li key={index}>
                                <SymbolRelationComponent
                                getRelationsOfSymbol={props.getRelationsOfSymbol}
                                symbol={symbol}
                                isPrefix={props.isPrefix}
                                isMarked = {markedSymbol===symbol}
                                symbolClicked={()=>handleSymbolClicked(symbol,props.isPrefix)}
                                needToClear={props.needToClear}
                                />
                                </li>
                            )
                        }
                    )}
                </ul>
            </ScrollView>
 
    </div>
    )     
}

export default SymbolRelationTable;