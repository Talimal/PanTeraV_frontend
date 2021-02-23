import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {rootStyle} from './cardStyle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";


const RootCard = (props) => {

    const root = props.root;
    const toShow=props.toShow;

    const history = useHistory();
    let graphs = function(){
        history.push({pathname: "/graphs",
        state:{root:root,toShow:toShow}});
    };

    return (
        <Card style={rootStyle} hoverable="true">
            <CardContent>
                {root.getSymbols().length>0?
                root.printSymbols():"root"}
            </CardContent>
            <CardContent>
                {root.getRelations().length>0?
                root.printRelations():""}
            </CardContent>
            <CardContent>
                {root.getSymbols().length>0?
                root.printSupportingEnt():""}
            </CardContent>
            <CardContent>
                {root.getSymbols().length>0?
                root.printMeanHorSup():""}
            </CardContent>
        <Button onClick={graphs}> Learn More </Button>
    </Card>
    );
    }

export default RootCard;