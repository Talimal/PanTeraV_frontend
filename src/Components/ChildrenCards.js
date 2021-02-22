import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {complexNode,notComplexNode,placeHolderCard} from '../cardStyle'
import 'bootstrap/dist/css/bootstrap.min.css';


const ChildrenCards = (props) => {

    const childrenToShow=props.toShow

    const handleClick = (child)=>{
        return props.handleClick(child)
    }
    const isComplexNode = (child)=>{
        return props.isComplexNode(child)
    }

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
                        {child.getSymbols().length>0?
                        child.printSymbols():"child"}
                    </CardContent>
                    <CardContent>
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
                    </CardContent>
                    <Button onClick={()=>handleClick(child)}> Learn More </Button>
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