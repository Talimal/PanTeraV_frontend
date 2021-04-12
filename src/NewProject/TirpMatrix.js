import React ,{useRef, useState} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './TirpMatrix.css';


const TirpMatrix = (props) => {
    const relationsJson = {
        '<':'before (<)',
        'c':'contains (c)',
        'm':'meet (m)',
        's':'starts(s)',
        'o':'overlap(o)',
        'f':'finished-by(f)',
        '=':'equal(=)'
    }
    const tirp = props.tirp;
    const symbols = tirp.getSymbols();
    const relations = tirp.getRelations();
    const matrixRowsIndexes = new Array(symbols.length-1).fill(0);
    const matrixColumnsIndexes = new Array(symbols.length).fill(0);
  
    // this method keeps track of the next relation to be presented
    // in the half matrix : 
    // every call the index theat points to the next relation grows.
    let relationIndex = 0;
    const get_approprite_relation = ()=>{
        relationIndex++;
        return relations[relationIndex - 1];
    }

    return (
        <div className="tirpMatrix" >
                <ReactBootstrap.Table
                    className="table table-bordered" 
                    style={{'fontSize':'large',
                    'background':'#4ddbff',
                    'width':'50%',
                    'height':'50%'}}
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
                                                i>0 && i>=j?
                                                 null:
                                                relationsJson[get_approprite_relation()]
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