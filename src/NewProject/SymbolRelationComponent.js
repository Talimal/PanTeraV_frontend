import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

const SymbolRelationComponent = (props) => {

    const needToClear = props.needToClear;

    const getBorderColor = ()=>{
        if(props.isMarked){
            if(props.isPrefix){
                return {'border':'5px solid rgb(30, 199, 53)'};
            }
            else{
                return {'border':'5px solid rgb(216, 35, 35)'};
            }
        }
        else{
            return {'border':'5px solid rgb(0, 0, 0)'};
        }
    }

    return (
        <div className="symbolRelationTable" 
            style={needToClear?{'border':'5px solid rgb(0, 0, 0)'}:getBorderColor()}>
                <ReactBootstrap.Table 
                    className="table table-bordered" 
                    style={{'fontSize':'large'}}
                    onClick={props.symbolClicked}
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th>Symbol: {props.symbol}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.getRelationsOfSymbol(props.symbol,props.isPrefix).map((relation, i) => {
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
    )     
}

export default SymbolRelationComponent;