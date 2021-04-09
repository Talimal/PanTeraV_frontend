import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './TirpMatrix.css';


const TirpMatrix = (props) => {
    const relationsJson = {
        '<':'before (<)',
        'c':'contains (c)',
        'm':'meet (m)'
    }
    const tirp = props.tirp;
    const symbols = tirp.getSymbols();
    const relations = tirp.getRelations();
    const matrixRowsIndexes = new Array(symbols.length-1).fill(0);
    const matrixColumnsIndexes = new Array(symbols.length).fill(0);
  
    return (
        <div className="tirpMatrix" >
                <ReactBootstrap.Table
                    className="table table-bordered" 
                    style={{'fontSize':'large','background':'#4ddbff'}}
                    >
                        <thead 
                            style={{'fontWeight': 'bold'}}>
                           <tr>
                                {symbols.map((_,index)=>{
                                                return[
                                                    <td key={index}>
                                                        {index===0? null:symbols[index]}
                                                    </td>
                                                ];
                                })}      
                           </tr>
                        </thead>
                        <tbody>
                            {matrixRowsIndexes.map((_ , i)=>{
                                 return [
                                    <tr key={i}>
                                        {
                                        matrixColumnsIndexes.map((_ , j)=>{
                                         return [
                                             <td 
                                                key={j}
                                                style={j===0?{'fontWeight': 'bold'}:null}
                                             >
                                                 {j===0?symbols[i]:
                                                //  half matrix is empty
                                                i>0 && i===j?
                                                 null:
                                                // symbols.length-1 = # symbols every row
                                                // (i-1) = because i=0 is the symbols row
                                                // (j-1) = because j=0 is the symbols column
                                                // -(i-1) = all the symbols in same row that was
                                                // deleted due to the condition above (half matrix)
                                                relationsJson[relations[(symbols.length-1)*(i)+(j-1)-(i)]]
                                                }
                                             </td>
                                        ];
                                        })}
                                    </tr>
                                ];
                            })}
                        </tbody>
                </ReactBootstrap.Table>
        </div>  
    )     
}

export default TirpMatrix;