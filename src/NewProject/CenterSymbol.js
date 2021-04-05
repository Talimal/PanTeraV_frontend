import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';


const CenterSymbol = (props) => {

    return (
        <ReactBootstrap.Table className="table table-bordered" style={{'fontSize':'large'}}>
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
                                {relation}
                            </td>
                        </tr>
                    ];
                })}
            </tbody>
        </ReactBootstrap.Table>
    )     
}

export default CenterSymbol;