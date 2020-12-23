import React,  { useRef, useState } from 'react';
import './Parent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { color } from 'd3';


const Parent = (props) => {

    const [root, setRoot] = useState(props.root);
    const [children, setChildren] = useState(props.children);
    let presented=[];
    const notPresented=useRef([]);
    const subtractTwoArrays = (arr1, arr2) => arr1.filter( el => !arr2.includes(el) )
    const [search, setSearch] = useState("");


    /* deciding on what children to present*/
    if(children.length>3){
        presented=children.slice(0,3);
        notPresented.current=subtractTwoArrays(children,presented);
    }
    else{
        presented=children;
    }

    /* every moment, one root and it's children are presented.
        this function gets a node and sets the root as the selected
        node and updated the children to the selected node's children.
    */
    const handleClick = (node) => {
        setRoot(node);
        setChildren(props.getChildrenOfRoot(node));
    }

    /* every moment, one root and it's children are presented.
        this function needs to present the previous root
         (the father of current root)
    */
    const handleClickPrevious =() => {
        //getting father of current root
        const father = props.handleClickPrevious(root);
        if(father!=null){
            setRoot(father);
            setChildren(props.getChildrenOfRoot(father));
        }
        else{
            alert("no previous level");
        }
    }

    /* every moment, only 3 children max presented.
        this function needs to present the children after those presented 
        right now.
    */
    const handleClickMore = (event) => {
        //there are more children to present
        if(notPresented.current.length>0){
            //there are more than 3 children to present next (>=4)
            if(notPresented.length>3){
                let notPresentedCopy=notPresented.current;
                //the next 3 children to present
                presented=notPresented.current.slice(0,3);
                //updating the not presented children after this iteration
                notPresented.current=subtractTwoArrays(notPresentedCopy,presented);
                setChildren(presented);
            }
            else{
                //there are less then 3 more children to present (<=3)
                presented=notPresented.current;
                notPresented.current=[];
                setChildren(presented);
            }

        }
    }

    /* every moment, only 3 children max presented.
        this function needs to present the children before those presented 
        right now.
    */
    const handleClickLess = (event)=>{
        //first child right now
        let firstPresent = presented[0];
        //all children in this tree level
        let childrenAll = props.getChildrenOfRoot(root);
        //index of the first presented child in the array of all children
        let lastIndex = childrenAll.indexOf(firstPresent);
        //if there is no previous children
        if(lastIndex===0){
            alert("There are no more children");
        }
        //there are previous children
        else{
            //all the previous children
            let needToPresent=childrenAll.slice(0,lastIndex);
            //update the nodes that not present after this iteration
            notPresented.current=childrenAll.slice(lastIndex,childrenAll.length);

            //there are more than 3 (>=4) previous children
            if (needToPresent.length>3){
                //present the 3 closest children to the first current one
                presented = needToPresent.slice(needToPresent.length-3,needToPresent.length);
                setChildren(presented);
            }
            else{
                //there is less than 3 (<=3) previoud children
                presented = needToPresent;
                setChildren(presented);
            }
        }

    }
/* filter and show only requested children*/
    const setFilter = (filterString)=>{
        if(filterString===""){
            setChildren(props.getChildrenOfRoot(root));
        }
        else{
            const filteredArr = children.filter(child => {
                return child.printSymbols().includes(filterString)
            });

            setChildren(filteredArr);
        }
    }

    const isComplexNode = (tirp)=> {
        return props.isComplexNode(tirp);
    }
   
    var rootStyle = {
        'height': '9em',
        'width':'9em',
        'background' :'rgb(243, 43, 216)',
        'marginTop': '3em',
        'fontSize': '20px',
        'fontFamily': 'cursive',
        'cursor': 'pointer'
    }

    var complexNode={
        'background': 'rgb(167, 33, 230)',
        'width': '8em',
        'height': '8em',
        'borderStyle': 'solid',
        'borderWidth': 'thick',
        'marginBottom': '5px',
        'fontSize': '20px',
        'fontFamily': 'cursive',
        'cursor': 'pointer'
    }

    var notComplexNode={
        'background': 'rgb(167, 33, 230)',
        'width': '8em',
        'height': '8em',
        'marginBottom': '5px',
        'fontSize': '20px',
        'fontFamily': 'cursive'
    }

    return (
        <div className="flex-container">
        <input type="text" className="input" placeholder="Search" onChange={(e)=>setFilter(e.target.value)}/>
            <div className="flex-container-nodes">

                <Card style={rootStyle} hoverable="true">
                    <CardContent>
                        {root.getSymbols().length>0?
                        root.printSymbols():"root"}
                    </CardContent>
                    <CardContent>
                        {root.getRelations().length>0?
                        root.printRelations():""}
                    </CardContent>
                    <Button> Learn More </Button>
                </Card>

                    {/* <div className="root">
                        <button>{root.getSymbols().length>0?
                        root.printSymbols():"root"}</button>
                        <h1>{root.printRelations()}</h1>
                    </div> */}
                <div className="children">Children:
                    <ul>
                        {search === "" ?presented.map((child,index) => {
                            return (
                                <li key={index}>

                                    <Card 
                                        style={isComplexNode(child)?complexNode:notComplexNode}
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
                                        <Button onClick={()=>handleClick(child)}> Learn More </Button>
                                    </Card>

                                    {/* <div className={isComplexNode(child)?"nodeComplex":"nodeSimple"} >
                                        <button onClick={()=>handleClick(child)}>{child.printSymbols()}</button>
                                    </div> */}
                                </li>
                                )}) :
                                null
                            }
                             {/* filteredChildren().map((child,index)=>{
                                return (
                                    <li key={index}>

                                    <Card 
                                        style={isComplexNode(child)?complexNode:notComplexNode}
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
                                        <Button onClick={()=>handleClick(child)}> Learn More </Button>
                                    </Card>

                                    </li>

                                    <li key={index}>
                                    <div className={isComplexNode(child)?"nodeComplex":"nodeSimple"} >
                                        <button onClick={()=>handleClick(child)}>{child.getSymbols()}</button>
                                    </div>
                                </li>
                                )}) */}        
                    </ul>
                </div>
            </div>
            <div className="flex-container-buttons">
                <button onClick={handleClickPrevious}>Previous</button>
                <button onClick={handleClickMore}>Show more</button>
                <button onClick={handleClickLess}>Show less</button>
           </div>
        </div>

    );
  }
  
  export default Parent;