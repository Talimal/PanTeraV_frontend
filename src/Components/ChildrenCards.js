import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardHeader} from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import {complexNode,notComplexNode,placeHolderCard} from './CardStyle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";


const ChildrenCards = ({handleClick,isComplexNode,toShow,isAfterChild,tirpSymbolName}) => {

    const childrenToShow=toShow;
    const history = useHistory();
    let graphs = function(tirpID){
        history.push({pathname: "/graphs",
                    state:{ tirpID: tirpID}})
    };

    return childrenToShow.map((child,index) => {
    return (
        
        <li key={index}>
            {child!==0?
                <Card 
                    style={isComplexNode(child)?complexNode
                        :notComplexNode}
                    onClick={isComplexNode(child)?()=>handleClick(child):null}
                    >                                        
                    <CardContent>
                        {isAfterChild?(tirpSymbolName[child.getSymbols()]).getLastName():(tirpSymbolName[child.getSymbols()]).getLastName()}
                        {/* {child.getSize()>0?
                        (isAfterChild?child.getLastName():child.getFirstSymbol())
                        :"child"} */}
                    </CardContent>
                    {/* <CardContent>
                        {child.getRelations().length>0?
                        child.printRelations():""}
                    </CardContent>
                    <CardContent>
                        {child.getSymbols().length>0?
                        child.printSupportingEnt():""}
                    </CardContent>
                    <CardContent>
                        {child.getSymbols().length>0?
                        child.printMeanHorSup():""}
                    </CardContent> */}
                    <Button onClick={()=>graphs(child.getID())}> Learn More </Button>
                </Card>
                :
                <Card
                    style={placeHolderCard}>
                </Card>    
            }
        </li>
        )}
) 
      
}

export default ChildrenCards;