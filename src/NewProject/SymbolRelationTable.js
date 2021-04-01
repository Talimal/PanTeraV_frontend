import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './SymbolRelationTable.css';

const SymbolRelationTable = (props) => {

    const [borderColor,setBorderColor] = useState({'border':'5px solid rgb(0, 0, 0))'});
    const tableClicked = ()=>{
        setBorderColor({'border':'5px solid rgb(30, 199, 53)'})
    }
    const resetTableBorder = ()=>{
        setBorderColor({'border':'5px solid rgb(0, 0, 0)'})
    }
    return (
        <div>
            <button onClick={resetTableBorder}>
                Clear
            </button>
            {props.symbols.map((symbol,index) => {
                return (
                    
                    <li key={index}>
                        <div className="symbolRelationTable" style={borderColor} onClick={tableClicked}>
                                <ReactBootstrap.Table className="table table-bordered" style={{'background':'transparent'}} striped bordered hover>
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Symbol: {symbol}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {props.getRelationsOfSymbol(symbol,props.isPrefix).map((relation, i) => {
                                            return [
                                                <tr key={i}>
                                                    <td>
                                                        {relation}
                                                    </td>
                                                </tr>
                                            ];
                                        })}
                                        </tbody>
                                </ReactBootstrap.Table>
                        </div>  
                    </li>
                    )
                }
            )} 
    </div>
    )     
}

export default SymbolRelationTable;