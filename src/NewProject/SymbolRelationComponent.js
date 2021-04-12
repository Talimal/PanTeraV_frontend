import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const SymbolRelationComponent = (props) => {

    // Allen's relations json for casting from symbols to meaningful names
    const relationsJson = {
        '<':'before (<)',
        'c':'contains (c)',
        'm':'meet (m)',
        's':'starts(s)',
        'o':'overlap(o)',
        'f':'finished-by(f)',
        '=':'equal(=)'
    }


    const needToClear = props.needToClear;

    // method that returns the border color of a component according
    // to it's internal state
    const getBorderColor = ()=>{
        if(props.isMarked){
            if(props.isPrefix){
                return {'border':'8px solid rgb(30, 199, 53)'};
            }
            else{
                return {'border':'8px solid rgb(216, 35, 35)'};
            }
        }
        else{
            return {'border':'3px solid rgb(0, 0, 0)'};
        }
    }

    return (
        <div className="symbolRelationTable" 
            style={
                needToClear?{'border':'3px solid rgb(0, 0, 0)'}
                :getBorderColor()}>
                <ReactBootstrap.Table
                    className="table table-bordered" 
                    style={{'fontSize':'large','background':'#e6ffff'}}
                    onClick={props.symbolClicked}
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th>Symbol: {props.symbol}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.relations.map((relation, i) => {
                            return [
                                <tr key={i}>
                                    <td>
                                        {relationsJson[relation]}
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