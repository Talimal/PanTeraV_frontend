import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './CenterSymbol.css';

const CenterSymbol = (props) => {
    const relationsJson = {
        '<':'before (<)',
        'c':'contains (c)',
        'm':'meet (m)'
    }

    return (
        <ReactBootstrap.Table 
            className="centerComponentTable" 
            >
             <thead>
                <tr>
                <th>{props.symbolName}</th>
                </tr>
            </thead>
            <tbody>
                {props.relationsVector.map((relation, i) => {
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
    )     
}

export default CenterSymbol;