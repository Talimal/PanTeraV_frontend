import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

const SymbolRelationTable = (props) => {

    return props.symbols.map((symbol,index) => {
    return (
        
        <li key={index}>
            <div>
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
        )}
) 
      
}

export default SymbolRelationTable;