import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';


const CenterSymbol = (props) => {
    const relationsJson = {
        '<':'before (<)',
        'c':'contains (c)',
        'm':'meet (m)'
    }

    return (
        <ReactBootstrap.Table 
            className="table table-bordered" 
            style={
                {'fontSize':'large',
                'background':'#ff99ff'}
            }>
             <thead className="thead-dark">
                <tr>
                <th>Symbol: {props.symbol}</th>
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