import React,  { useRef, useState } from 'react';
import './Parent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            alert(children[0].getSize()+" is the first node");
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
    const filteredChildren = {}
    //     presented.filter(child => {
    //         return child.name.includes(search)
    // }

const isComplexNode = (tirp)=> {
    return props.isComplexNode(tirp);
}
   
    return (
        <div className="flex-container">
        <input type="text" className="input" placeholder="Search" onChange={e=>setSearch(e.target.value)}/>
            <div className="flex-container-nodes">
                    <div className="root">
                        {/* channges to size */}
                        <button>{root.getSymbols().length>0?
                        root.getSymbols():"root"}</button>
                    </div>
                <div className="children">Children:
                    <ul>
                        {search === "" ?presented.map((item,index) => {
                            return (
                                <li key={index}>
                                    <div className={isComplexNode(item)?"nodeComplex":"nodeSimple"} >
                                        <button onClick={()=>handleClick(item)}>{item.getSymbols()}</button>
                                    </div>
                                </li>
                            )}):filteredChildren.map((item,index) => {
                                return (
                                    <li key={index}>
                                        {/* <div className={item.children.length>0?"nodeComplex":"nodeSimple"} >
                                            <button onClick={()=>handleClick(item)}>{item.name}</button>
                                        </div> */}
                                    </li>
                                )})}
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