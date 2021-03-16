import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {complexNode,notComplexNode,placeHolderCard,complexNodeBefore,notComplexNodeBefore,complexNodeAfter,notComplexNodeAfter} from './CardStyle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import "./ChildrenCards.css";

const ChildrenCards = ({handleClick,isComplexNode,toShow,isAfterChild,tirpSymbolName}) => {

    const childrenToShow=toShow;
    const history = useHistory();
    let graphs = function(tirp){
        history.push({pathname: "/graphs",
                    state:{ 
                            tirpName:printName(tirp.getSymbols()),
                            tirpSymbols:tirp.getSymbols(),
                            tirpRelations:tirp.getRelations()}})
    };
    const printName = (symbols)=>{
        let toPrint="";
        if(symbols.length===1){
            toPrint=tirpSymbolName[symbols].getName()+"-";
        }
        else{
            toPrint=symbols.map((symbol)=>{
                return tirpSymbolName[symbol].getLastName();
            });
            toPrint = toPrint.join("-");
        }
        return toPrint.slice(0,-1);
    }
    return childrenToShow.map((child,index) => {
    return (
        
        <li key={index}>
            <div className="card">
                {child!==0?
                    <Card 
                        style={isAfterChild===false?isComplexNode(child)?complexNodeBefore:notComplexNodeBefore
                                                :isComplexNode(child)?complexNodeAfter:notComplexNodeAfter
                                }
                        onClick={isComplexNode(child)?()=>handleClick(child):null}
                        >
                        <div className="titleDiv">                                        
                            <CardContent>
                                {/* {child.getSymbols()} */}
                                {isAfterChild?(tirpSymbolName[child.getSymbols()]).getLastName():(tirpSymbolName[child.getSymbols()]).getFirstName()}
                            </CardContent>
                        </div>
                        <div className="buttonDiv">
                            <Button className="cardButton"
                            style={{
                                'color':'black',
                                'fontSize':'medium',
                                'border':'3px solid rgb(236, 240, 236)'

                                }}
                            onClick={()=>graphs(child)}> Learn More </Button>
                        </div>
                    </Card>
                    :
                    <Card
                        style={placeHolderCard}>
                    </Card>  
                }
            </div>  

        </li>
        )}
) 
      
}

export default ChildrenCards;