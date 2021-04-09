import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

const TirpMatrix = (props) => {
    const relationsJson = {
        '<':'before (<)',
        'c':'contains (c)',
        'm':'meet (m)'
    }
    const tirp = props.tirp;
    const symbols = tirp.getSymbols();
    const relations = tirp.getRelations();
    const matrixRowsIndexes = new Array(symbols.length).fill(0);
    const matrixColumnsIndexes = new Array(symbols.length).fill(0);
  
    return (
        <div className="tirpMatrix" >
                <ReactBootstrap.Table
                    className="table table-bordered" 
                    style={{'fontSize':'large','background':'#e6ffff'}}
                    >
                        <tbody>
                            {matrixRowsIndexes.map((_ , i)=>{
                                 return [
                                    <tr key={i}>
                                        {i===0?
                                            symbols.map((_,index)=>{
                                                return[
                                                    <td key={index}>
                                                        {index===0? null:symbols[index]}
                                                    </td>
                                                ];
                                            })                                            
                                        :
                                        matrixColumnsIndexes.map((_ , j)=>{
                                         return [
                                             <td key={j}>
                                                 {j===0?symbols[i-1]:
                                                //  half matrix is empty
                                                i>1 && i===j+1?
                                                 null:
                                                // symbols.length-1 = # symbols every row
                                                // (i-1) = because i=0 is the symbols row
                                                // (j-1) = because j=0 is the symbols column
                                                // -(i-1) = all the symbols in same row that was
                                                // deleted due to the condition above (half matrix)
                                                relationsJson[relations[(symbols.length-1)*(i-1)+(j-1)-(i-1)]]
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