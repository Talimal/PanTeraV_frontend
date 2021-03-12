import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {rootStyle} from './CardStyle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import './RootCard.css'


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
            <Card style={rootStyle} hoverable="true">
                <div className="cardBody">                                        
                    <CardContent>
                        {root.getSize()>0?
                        printName(root.getSymbols()):"root"}
                    </CardContent>
                
                    <CardContent>
                        {root.getRelations().length>0?
                        "relations: "+root.printRelations():""}
                    </CardContent>
                    <CardContent>
                        {root.getSize()>0?
                        root.printSupportingEnt():""}
                    </CardContent>
                    <CardContent>
                        {root.getSize()>0?
                        root.printMeanHorSup():""}
                    </CardContent>
                </div>
                <div className="buttonDiv">
                    <Button className="cardButton" style={{
                                        'color':'black',
                                        'font-size':'large',
                                        'border':'3px solid rgba(4, 150, 12, 0.671)'

                                        }} onClick={graphs}> Learn More </Button>
                </div>
            </Card>
    </div>
    );
    }

export default RootCard;