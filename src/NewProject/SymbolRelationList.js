import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './SymbolRelationList.css';
import { ScrollView ,ScrollObserver} from "@cantonjs/react-scroll-view";
import SymbolRelationComponent from './SymbolRelationComponent';


const SymbolRelationList = (props) => {

    // marked symbol is the component that pressed at the moment
    const [markedSymbol,setMarkedSymbol] = useState(props.needToClear?null:props.default);

    // component from the component's list was pressed
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

export default SymbolRelationList;