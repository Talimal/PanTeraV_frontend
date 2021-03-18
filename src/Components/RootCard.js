import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {rootStyle} from './CardStyle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import './RootCard.css'
import * as ReactBootstrap from 'react-bootstrap';


const RootCard = (props) => {

    const root = props.root;

    const history = useHistory();
    let graphs = function(){
        history.push({pathname: "/graphs",
                    state:{ tirpID: root.getID(),
                            tirpName:printName(root.getSymbols())}})
    };

    const printName = (symbols)=>{
        let toPrint="";
        if(root.getSize()===1){
            toPrint=props.tirpSymbolName[symbols].getName()+"-";
        }
        else{
            toPrint=symbols.map((symbol)=>{
                return props.tirpSymbolName[symbol].getLastName()
            });
            toPrint = toPrint.join("-")
        }
        return toPrint.slice(0,-1);
    }
    return (
        <div className="RootCard">
            <div className="colorLines">
                {/* <div>
                    <hr className="firstLine"
                        style={{
                            color:'#ad47f6',
                            backgroundColor: '#ad47f6',
                            height: 5
                        }}
                    />
                </div>
                <div>
                    <hr className="secondLine"
                        style={{
                            color:'blue',
                            backgroundColor: 'blue',
                            height: 5
                        }}
                    />
                </div> */}
                <h1 className="purple">""</h1>
                <h1 className="blue">""</h1>
            </div>
            <Card style={rootStyle} hoverable="true">
                <div className="cardBody">                                        
                    <CardContent>
                        {root.getSize()>0?
                        printName(root.getSymbols()):"root"}
                    </CardContent>
                
                    <CardContent>
                        {root.getSize()>0?
                        <ReactBootstrap.Table className="table table-bordered" style={{'background':'transparent'}} striped bordered hover>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Relations:</th>
                                    <th># Supporting Entites:</th>
                                    <th>Mean Horizontal Support:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="data-table-row">
                                    <td>
                                        {root.getRelations().length>0?root.getRelations():""}
                                    </td>
                                    <td>
                                        {root.getSize()>0?root.getNumSupEnt():""}
                                    </td>
                                    <td>
                                        {root.getSize()>0?Number(root.getMeanHorSup()).toFixed(2):""}
                                    </td>
                                </tr>
                            </tbody>
                        </ReactBootstrap.Table>
                        :null}


                        {/* {root.getRelations().length>0?
                        "relations: "+root.printRelations():""}
                    </CardContent>
                    <CardContent>
                        {root.getSize()>0?
                        root.printSupportingEnt():""}
                    </CardContent>
                    <CardContent>
                        {root.getSize()>0?
                        root.printMeanHorSup():""} */}
                    </CardContent>
                </div>
                <div className="buttonDivRoot">
                    <Button className="cardButton" style={{
                                        'color':'black',
                                        'fontSize':'large',
                                        'border':'3px solid rgb(0, 0, 0)'

                                        }} onClick={graphs}> Learn More </Button>
                </div>
            </Card>
           
    </div>
    );
    }

export default RootCard;