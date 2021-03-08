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
    const [children, setChildren] = useState(props.startChildren);
    const [endChildren, setEndChildren] = useState(props.endChildren);
    let presented=[];
    let presentedEndChildren=[];
    const notPresented=useRef([]);
    const notPresentedEndChildren=useRef([]);
    const tirpHistory=useRef([]);
    const subtractTwoArrays = (arr1, arr2) => arr1.filter( el => !arr2.includes(el) )




    const initialPresent = ()=>{
        if(children.length>3){
            presented=children.slice(0,3);
            notPresented.current=subtractTwoArrays(children,presented);
        }
        else{
            presented=children;
        }
        if(endChildren.length>3){
            presentedEndChildren=endChildren.slice(0,3);
            notPresentedEndChildren.current=
            subtractTwoArrays(endChildren,presentedEndChildren);
        }
        else{
            presentedEndChildren=endChildren;
        }
    }

     /* deciding on what children to present*/
     initialPresent();

    /* every moment, one root and it's children are presented.
        this function gets a node and sets the root as the selected
        node and updated the children to the selected node's children.
    */
    const handleClick = (node) => {
        tirpHistory.current=root.getSize()===0?
                                        []:
                                        tirpHistory.current.concat([root.getSymbols()])
        setRoot(node);
        setChildren(props.getChildrenOfRoot(node));
        setEndChildren(props.getChildrenEnd(node));
    }

    /* is there a level before the current root?*/
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
            setEndChildren(props.getChildrenEnd(father));
        }
        else{
            alert("no previous level");
        }
    }

    /* every moment, only 3 children max presented.
        this function needs to present the children after those presented 
        right now.
    */
        const handleClickMoreGeneric = (isRegularChild) => {
            let notPresentedTemp=null;
            let presentedTemp=null;

            if(isRegularChild===true){
                notPresentedTemp=notPresented;
                presentedTemp=presented;
            }
            else{
                notPresentedTemp=notPresentedEndChildren;
                presentedTemp=presentedEndChildren;
            }
            //there are more children to present
            if(notPresentedTemp.current.length>0){
                //there are more than 3 children to present next (>=4)
                if(notPresentedTemp.length>3){
                    let notPresentedCopy=notPresentedTemp.current;
                    //the next 3 children to present
                    presentedTemp=notPresentedTemp.current.slice(0,3);
                    //updating the not presented children after this iteration
                    notPresentedTemp.current=subtractTwoArrays(notPresentedCopy,presentedTemp);
                    
                    isRegularChild?setChildren(presentedTemp):
                                    setEndChildren(presentedTemp);
                }
                else{
                    //there are less then 3 more children to present (<=3)
                    presentedTemp=notPresentedTemp.current;
                    notPresentedTemp.current=[];
                    isRegularChild?setChildren(presentedTemp):
                                    setEndChildren(presentedTemp);
                }
    
            }
            else{
                alert("There are no more children");
            }
        }

    // const handleClickMore = (event) => {
    //     //there are more children to present
    //     if(notPresented.current.length>0){
    //         //there are more than 3 children to present next (>=4)
    //         if(notPresented.length>3){
    //             let notPresentedCopy=notPresented.current;
    //             //the next 3 children to present
    //             presented=notPresented.current.slice(0,3);
    //             //updating the not presented children after this iteration
    //             notPresented.current=subtractTwoArrays(notPresentedCopy,presented);
    //             setChildren(presented);
    //         }
    //         else{
    //             //there are less then 3 more children to present (<=3)
    //             presented=notPresented.current;
    //             notPresented.current=[];
    //             setChildren(presented);
    //         }

    //     }
    //     else{
    //         alert("There are no more children");
    //     }
    // }

    // const handleClickMoreEnd = (event) => {
    //     console.log("now")
    //     //there are more children to present
    //     if(notPresentedEndChildren.current.length>0){
    //         //there are more than 3 children to present next (>=4)
    //         if(notPresentedEndChildren.length>3){
    //             let notPresentedCopy=notPresentedEndChildren.current;
    //             //the next 3 children to present
    //             presentedEndChildren=notPresentedEndChildren.current
    //                                                 .slice(0,3);
    //             //updating the not presented children after this iteration
    //             notPresentedEndChildren.current=
    //             subtractTwoArrays(notPresentedCopy,presentedEndChildren);
    //             setEndChildren(presentedEndChildren);
    //         }
    //         else{
    //             //there are less then 3 more children to present (<=3)
    //             presentedEndChildren=notPresentedEndChildren.current;
    //             notPresentedEndChildren.current=[];
    //             setEndChildren(presentedEndChildren);
    //         }

    //     }
    //     else{
    //         alert("There are no more children");
    //     }
    // }

    const canShowPrevChildrenGeneric = (isRegularChild)=>{
            let presentedTemp=null;
            let getChildrenFronUp=null;
            

            if(isRegularChild===true){
                presentedTemp=presented;
                getChildrenFronUp=(root)=>props.getChildrenOfRoot(root)
            }
            else{
                presentedTemp=presentedEndChildren;
                getChildrenFronUp=(root)=>props.getChildrenEnd(root)
            }


         //first child right now
         let firstPresent = presentedTemp[0];
         //all children in this tree level
         let childrenAll = getChildrenFronUp(root);
         //index of the first presented child in the array of all children
         let lastIndex = childrenAll.indexOf(firstPresent);
         //if there is no previous children
         if(lastIndex===0){
             return false;
         }
         else
         return true;
    }
//     const canShowPrevChildren = ()=>{
//          //first child right now
//          let firstPresent = presented[0];
//          //all children in this tree level
//          let childrenAll = props.getChildrenOfRoot(root);
//          //index of the first presented child in the array of all children
//          let lastIndex = childrenAll.indexOf(firstPresent);
//          //if there is no previous children
//          if(lastIndex===0){
//              return false;
//          }
//          else
//          return true;
//     }
//     const canShowPrevChildrenEnd = ()=>{
//         //first child right now
//         let firstPresent = presentedEndChildren[0];
//         //all children in this tree level
//         let childrenAll = props.getChildrenEnd(root);
//         //index of the first presented child in the array of all children
//         let lastIndex = childrenAll.indexOf(firstPresent);
//         //if there is no previous children
//         if(lastIndex===0){
//             return false;
//         }
//         else
//         return true;
//    }

    const canShowMoreChildrenGeneric = (isRegularChild)=>{
        let notPresentedTemp=null;

        isRegularChild?notPresentedTemp=notPresented:notPresentedTemp=notPresentedEndChildren;
        if (notPresentedTemp.current.length>0){
            return true;
        }
        else{
            return false;
        }
    }
//     const canShowMoreChildren = ()=>{
//         if (notPresented.current.length>0){
//             return true;
//         }
//         else{
//             return false;
//         }
//    }

//    const canShowMoreChildrenEnd = ()=>{
//     if (notPresentedEndChildren.current.length>0){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

    /* every moment, only 3 children max presented.
        this function needs to present the children before those presented 
        right now.
    */

    const handleClickLessGeneric = (isRegularChild)=>{

        let presentedTemp=null;
        let notPresentedTemp=null;
        let getChildrenFronUp=null;
        

        if(isRegularChild===true){
            presentedTemp=presented;
            notPresentedTemp=notPresented;
            getChildrenFronUp=(root)=>props.getChildrenOfRoot(root)
        }
        else{
            presentedTemp=presentedEndChildren;
            notPresentedTemp=notPresentedEndChildren;
            getChildrenFronUp=(root)=>props.getChildrenEnd(root)
        }


          //first child right now
          let firstPresent = presentedTemp[0];
          //all children in this tree level
          let childrenAll = getChildrenFronUp(root);
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
              notPresentedTemp.current=childrenAll.slice(lastIndex,childrenAll.length);
  
              //there are more than 3 (>=4) previous children
              if (needToPresent.length>3){
                  //present the 3 closest children to the first current one
                  presentedTemp = needToPresent.slice(needToPresent.length-3,needToPresent.length);
                  isRegularChild?setChildren(presentedTemp):
                                setEndChildren(presentedTemp)
              }
              else{
                  //there is less than 3 (<=3) previoud children
                  presentedTemp = needToPresent;
                  isRegularChild?setChildren(presentedTemp):
                                setEndChildren(presentedTemp)
              }
          }
    }
    // const handleClickLess = (event)=>{
    //     //first child right now
    //     let firstPresent = presented[0];
    //     //all children in this tree level
    //     let childrenAll = props.getChildrenOfRoot(root);
    //     //index of the first presented child in the array of all children
    //     let lastIndex = childrenAll.indexOf(firstPresent);
    //     //if there is no previous children
    //     if(lastIndex===0){
    //         alert("There are no more children");
    //     }
    //     //there are previous children
    //     else{
    //         //all the previous children
    //         let needToPresent=childrenAll.slice(0,lastIndex);
    //         //update the nodes that not present after this iteration
    //         notPresented.current=childrenAll.slice(lastIndex,childrenAll.length);

    //         //there are more than 3 (>=4) previous children
    //         if (needToPresent.length>3){
    //             //present the 3 closest children to the first current one
    //             presented = needToPresent.slice(needToPresent.length-3,needToPresent.length);
    //             setChildren(presented);
    //         }
    //         else{
    //             //there is less than 3 (<=3) previoud children
    //             presented = needToPresent;
    //             setChildren(presented);
    //         }
    //     }

    // }
    // const handleClickLessEnd = (event)=>{
    //     //first child right now
    //     let firstPresent = presentedEndChildren[0];
    //     //all children in this tree level
    //     let childrenAll = props.getChildrenEnd(root);
    //     //index of the first presented child in the array of all children
    //     let lastIndex = childrenAll.indexOf(firstPresent);
    //     //if there is no previous children
    //     if(lastIndex===0){
    //         alert("There are no more children");
    //     }
    //     //there are previous children
    //     else{
    //         //all the previous children
    //         let needToPresent=childrenAll.slice(0,lastIndex);
    //         //update the nodes that not present after this iteration
    //         notPresentedEndChildren.current=
    //             childrenAll.slice(lastIndex,childrenAll.length);

    //         //there are more than 3 (>=4) previous children
    //         if (needToPresent.length>3){
    //             //present the 3 closest children to the first current one
    //             presentedEndChildren = 
    //                 needToPresent.slice(needToPresent.length-3,
    //                                 needToPresent.length);
    //             setEndChildren(presentedEndChildren);
    //         }
    //         else{
    //             //there is less than 3 (<=3) previoud children
    //             presentedEndChildren = needToPresent;
    //             setEndChildren(presentedEndChildren);
    //         }
    //     }

    // }
/* filter and show only requested children*/
    const setFilterGeneric = (filterString,isRegularChild)=>{
        let getChildrenFronUp=null;
        let childrenTemp=null;

        if(isRegularChild===true){
            getChildrenFronUp=(root)=>props.getChildrenOfRoot(root)
            childrenTemp=children
        }
        else{
            getChildrenFronUp=(root)=>props.getChildrenEnd(root)
            childrenTemp=endChildren
        }

        if(filterString===""){
            isRegularChild?setChildren(getChildrenFronUp(root)):
                            setEndChildren(getChildrenFronUp(root))
            // setChildren(props.getChildrenOfRoot(root));
        }
        else{
            const filteredArr = childrenTemp.filter(child => {
                return child.printSymbols().includes(filterString)
            });

            isRegularChild?setChildren(filteredArr):setEndChildren(filteredArr)
            // setChildren(filteredArr);
        }
    }
    // const setFilter = (filterString)=>{
    //     if(filterString===""){
    //         setChildren(props.getChildrenOfRoot(root));
    //     }
    //     else{
    //         const filteredArr = children.filter(child => {
    //             return child.printSymbols().includes(filterString)
    //         });

    //         setChildren(filteredArr);
    //     }
    // }
    // const setFilterEnd = (filterString)=>{
    //     if(filterString===""){
    //         setEndChildren(props.getChildrenEnd(root));
    //     }
    //     else{
    //         const filteredArr = endChildren.filter(child => {
    //             return child.printSymbols().includes(filterString)
    //         });

    //         setEndChildren(filteredArr);
    //     }
    // }

    const isComplexNode = (tirp)=> {
        return props.isComplexNode(tirp);
    }

    /*returns all the children to be presented + place holders for missing ones*/
    const setInvisibleChildrenGeneric = (isRegularChild)=>{
        let presentedTemp=null;
        isRegularChild?presentedTemp=presented:presentedTemp=presentedEndChildren;
        const placeHolderArr =  new Array(presentedTemp.length%3===0?
                                            0:
                                            3-(presentedTemp.length)%3).fill(0)
        return presentedTemp.concat(placeHolderArr)
    }
    
    // const setInvisibleChildren = () =>{
    //     const a =  new Array(presented.length%3===0?0:3-(presented.length)%3).fill(0)
    //     return presented.concat(a)
    // }

    // const setInvisibleChildrenEnd = () =>{
    //     const a =  new Array(presentedEndChildren.length%3===0?0:
    //                     3-(presentedEndChildren.length)%3).fill(0)
    //     return presentedEndChildren.concat(a)
    // }
   

    return (
        <div className="flex-container-allPage">
             <div className="flex-container-input-children">
                <input type="text" className="input" placeholder="Search" onChange={(e)=>setFilterGeneric(e.target.value,false)}/>
                <div className="childrenBefore">
                    <ul className="list-of-children">
                        {
                            <ChildrenBefore handleClick={handleClick}
                                            isComplexNode={isComplexNode}
                                            toShow={setInvisibleChildrenGeneric(false)}
                            />
                        }
                    </ul>
                </div>
            </div>
            <div className="flex-container-arrow-buttons">
                <ArrowButtons 
                    canShowPrevChildren={()=>canShowPrevChildrenGeneric(false)}
                    canShowMoreChildren={()=>canShowMoreChildrenGeneric(false)}
                    handleClickMore={()=>handleClickMoreGeneric(false)}
                    handleClickLess={()=>handleClickLessGeneric(false)}
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
                    canShowPrevChildren={()=>canShowPrevChildrenGeneric(true)}
                    canShowMoreChildren={()=>canShowMoreChildrenGeneric(true)}
                    handleClickMore={()=>handleClickMoreGeneric(true)}
                    handleClickLess={()=>handleClickLessGeneric(true)}
                />
            </div>
            <div className="flex-container-input-children">
                <input type="text" className="input" placeholder="Search" onChange={(e)=>setFilterGeneric(e.target.value,true)}/>
                <div className="childrenAfter">
                    <ul className="list-of-children">
                        {
                            <ChildrenAfter handleClick={handleClick}
                                            isComplexNode={isComplexNode}
                                            toShow={setInvisibleChildrenGeneric(true)}
                            />
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
  }
  
  export default Parent;