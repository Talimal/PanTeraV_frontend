import React,  {useRef, useState } from 'react';
import './Parent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RootCard from './RootCard';
import ChildrenAfter from './ChildrenCards';
import ChildrenBefore from './ChildrenCards';
import MainButtons from './MainButtons';
import ArrowButtons from './ArrowButtons';

const Parent = (props) => {

    const [root, setRoot] = useState(props.root);
    const [children, setChildren] = useState(props.children);
    let presented=[];
    const notPresented=useRef([]);
    const tirpHistory=useRef([]);
    const subtractTwoArrays = (arr1, arr2) => arr1.filter( el => !arr2.includes(el) )


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
        tirpHistory.current=root.getSize()===0?
                                        []:
                                        tirpHistory.current.concat([root.getSymbols()])
        console.log(tirpHistory);
        setRoot(node);
        setChildren(props.getChildrenOfRoot(node));
    }


    const canShowPrevious = () =>{
        const father = props.handleClickPrevious(root);
        if(father!=null){
            return true;
        }
        else
        return false;
    }
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
        else{
            alert("There are no more children");
        }
    }

    const canShowPrevChildren = ()=>{
         //first child right now
         let firstPresent = presented[0];
         //all children in this tree level
         let childrenAll = props.getChildrenOfRoot(root);
         //index of the first presented child in the array of all children
         let lastIndex = childrenAll.indexOf(firstPresent);
         //if there is no previous children
         if(lastIndex===0){
             return false;
         }
         else
         return true;
    }

    const canShowMoreChildren = ()=>{
        if (notPresented.current.length>0){
            return true;
        }
        else{
            return false;
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

    /*returns all the children to be presented + place holders for missing ones*/
    const setInvisibleChildren = () =>{
        const a =  new Array(presented.length%3===0?0:3-(presented.length)%3).fill(0)
        return presented.concat(a)
    }
   

    return (
        <div className="flex-container-allPage">
             <div className="flex-container-input-children">
                <input type="text" className="input" placeholder="Search" onChange={(e)=>setFilter(e.target.value)}/>
                <div className="childrenBefore">
                    <ul className="list-of-children">
                        {
                            <ChildrenBefore handleClick={handleClick}
                                            isComplexNode={isComplexNode}
                                            toShow={setInvisibleChildren()}
                            />
                        }
                    </ul>
                </div>
            </div>
            <div className="flex-container-arrow-buttons">
                <ArrowButtons 
                    canShowPrevChildren={canShowPrevChildren}
                    canShowMoreChildren={canShowMoreChildren}
                    handleClickMore={handleClickMore}
                    handleClickLess={handleClickLess}
                />
            </div>
            <div className="flex-container-root-buttons">
                    <div className="flex-container-root">
                        <RootCard root={root}
                                toShow={presented}
                        />
                    </div>

                <div className="flex-container-buttons">
                    <MainButtons handleClickPrevious={handleClickPrevious}
                                canShowPrevious={canShowPrevious}
                    />
                </div>
            </div>
            <div className="flex-container-arrow-buttons">
                <ArrowButtons 
                    canShowPrevChildren={canShowPrevChildren}
                    canShowMoreChildren={canShowMoreChildren}
                    handleClickMore={handleClickMore}
                    handleClickLess={handleClickLess}
                />
            </div>
            <div className="flex-container-input-children">
                <input type="text" className="input" placeholder="Search" onChange={(e)=>setFilter(e.target.value)}/>
                <div className="childrenAfter">
                    <ul className="list-of-children">
                        {
                            <ChildrenAfter handleClick={handleClick}
                                            isComplexNode={isComplexNode}
                                            toShow={setInvisibleChildren()}
                            />
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
  }
  
  export default Parent;