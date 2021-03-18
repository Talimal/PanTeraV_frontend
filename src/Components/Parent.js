import React,  {useRef, useState,useEffect } from 'react';
import './Parent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RootCard from './RootCard';
import ChildrenAfter from './ChildrenCards';
import ChildrenBefore from './ChildrenCards';
import MainButtons from './MainButtons';
import ArrowButtons from './ArrowButtons';
import ArrowAfter from './DataArrowsAfter';
import ArrowBefore from './DataArrowsBefore';
import Chartjs from 'chart.js';

const Parent = ({propRoot,propStartChildren,propEndChildren,propHandleClickPrevious,getChildrenOfRoot,
                getChildrenEnd,propIsComplexNode,getRoot,tirpSymbolName})=>{

    const [root, setRoot] = useState(propRoot);
    const [children, setChildren] = useState(propStartChildren);
    const [endChildren, setEndChildren] = useState(propEndChildren);
    // const [isOK,setisOK]=useState(false);
    let presented=[];
    let presentedEndChildren=[];
    const notPresented=useRef([]);
    const notPresentedEndChildren=useRef([]);
    const tirpHistory=useRef([]);
    const inputBefore=useRef("");
    const inputAfter=useRef("");
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
        setChildren(getChildrenOfRoot(node));
        setEndChildren(getChildrenEnd(node));
    }

    /* is there a level before the current root?*/
    const canShowPrevious = () =>{
        const father = propHandleClickPrevious(root);
        if(father!=null){
            return true;
        }
        else
        return false;
    }

    const handleClickPrevious =() => {
        //getting father of current root
        const father = propHandleClickPrevious(root);
        if(father!=null){
            setRoot(father);
            setChildren(getChildrenOfRoot(father));
            setEndChildren(getChildrenEnd(father));
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

    
    const canShowPrevChildrenGeneric = (isRegularChild)=>{
            let presentedTemp=null;
            let getChildrenFronUp=null;
            

            if(isRegularChild===true){
                presentedTemp=presented;
                getChildrenFronUp=(root)=>getChildrenOfRoot(root)
            }
            else{
                presentedTemp=presentedEndChildren;
                getChildrenFronUp=(root)=>getChildrenEnd(root)
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
            getChildrenFronUp=(root)=>getChildrenOfRoot(root)
        }
        else{
            presentedTemp=presentedEndChildren;
            notPresentedTemp=notPresentedEndChildren;
            getChildrenFronUp=(root)=>getChildrenEnd(root)
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
   
/* filter and show only requested children*/
    const setFilterGeneric = (filterString,isRegularChild)=>{
        let getChildrenFronUp=null;
        let childrenTemp=null;

        if(isRegularChild===true){
            getChildrenFronUp=(root)=>getChildrenOfRoot(root)
            childrenTemp=children
            inputAfter.current=filterString;
        }
        else{
            getChildrenFronUp=(root)=>getChildrenEnd(root)
            childrenTemp=endChildren
            inputBefore.current=filterString;
        }

        if(filterString===""){
            isRegularChild?setChildren(getChildrenFronUp(root)):
                            setEndChildren(getChildrenFronUp(root))
        }
        else{
            const filteredArr = childrenTemp.filter(child => {
                return isRegularChild?child.getLastName().includes(filterString)
                                    :child.getFirstName().includes(filterString)
            });

            isRegularChild?setChildren(filteredArr):setEndChildren(filteredArr)
        }
    }

    const isComplexNode = (tirp)=> {
        return propIsComplexNode(tirp);
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
    const initialChartConfig = {
        type: "horizontalBar",
        data: {
            labels: [],
            datasets:[{}],
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontSize: 0
                }
            },
            scales: {
                xAxes: [
                    {
                    ticks: {
                        // beginAtZero: true,
                        // fontColor:"#000000",
                        // fontSize:12
                        display: true
                    }
                    }
                ],
                yAxes:[
                    {
                        ticks: {
                            display: false
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Time Line',
                fontSize:20,
                fontColor:'#0000FF'
            },
            tooltips: {
                titleFontSize: 12,
                bodyFontSize: 12
            }
        }
    }
      
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
        const newChartInstance = new Chartjs(chartContainer.current, initialChartConfig);
        setChartInstance(newChartInstance);
        }
    }, [chartContainer,root]);
    
    const updateChart = (newData,newLabels)=>{
        chartInstance.data.datasets[0].data = newData;
        chartInstance.data.labels= newLabels;
        chartInstance.data.datasets[0].backgroundColor = '#0000FF';
        chartInstance.update();
    }

    const clearChart = () => {
        chartInstance.clear();
    };

    const updateTimeLine = ()=>{
        if (root.getSize()===2){
            if(JSON.stringify(root.getRelations())==="<"){
                let newData=[[1,2],[3,4]];
                clearChart();
                updateChart(newData);
            }
            else{
                let newData=[[3,4],[1,2]];
                let newLabels=[root.getSymbols[0],root.getSymbols[1]]
                clearChart();
                updateChart(newData,newLabels);
            }
        }
    }

    return (
        <div className="TreeView">
            <div className="flex-container-tree-cards">
                
                <div className="flex-container-arrow-buttons-before">
                    {presentedEndChildren.length>1?
                    <ArrowButtons 
                        canShowPrevChildren={()=>canShowPrevChildrenGeneric(false)}
                        canShowMoreChildren={()=>canShowMoreChildrenGeneric(false)}
                        handleClickMore={()=>handleClickMoreGeneric(false)}
                        handleClickLess={()=>handleClickLessGeneric(false)}
                    />
                    :null}
                </div>

                <div className="flex-container-input-children-before">
                    <input type="text" className="input" 
                        placeholder="Search" 
                        hidden={setInvisibleChildrenGeneric(false).length===0&&inputBefore.current===""} 
                        onChange={(e)=>setFilterGeneric(e.target.value,false)}
                    />
                    <div className="childrenBefore">
                        <ul className="list-of-children">
                            {
                                <ChildrenBefore handleClick={handleClick}
                                                isComplexNode={isComplexNode}
                                                toShow={setInvisibleChildrenGeneric(false)}
                                                isAfterChild={false}
                                                tirpSymbolName={tirpSymbolName}
                                                
                                />
                            }
                        </ul>
                    </div>
                </div>
            {/* <div className="dataArrows-before">
                <ArrowBefore/>
            </div> */}
                <div className="flex-container-root-buttons">
                        <div className="flex-container-root">
                            <RootCard root={root}
                                    toShow={presented}
                                    tirpSymbolName={tirpSymbolName}

                            />
                        </div>

                    <div className="flex-container-buttons">
                        <MainButtons handleClickPrevious={handleClickPrevious}
                                    canShowPrevious={canShowPrevious}
                        />
                    </div>
                </div>
                {/* <div className="dataArrows-after">
                <ArrowAfter/>
            </div> */}
                <div className="flex-container-input-children-after">
                    <input type="text" className="input" 
                    placeholder="Search" 
                    // hidden={setInvisibleChildrenGeneric(true).length===0} 
                    onChange={(e)=>setFilterGeneric(e.target.value,true)}/>
                    <div className="childrenAfter">
                        <ul className="list-of-children">
                            {
                                <ChildrenAfter 
                                                handleClick={handleClick}
                                                isComplexNode={isComplexNode}
                                                toShow={setInvisibleChildrenGeneric(true)}
                                                isAfterChild={true}
                                                tirpSymbolName={tirpSymbolName}

                                />
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex-container-arrow-buttons-after">
                    {presented.length>1?
                    <ArrowButtons 
                        canShowPrevChildren={()=>canShowPrevChildrenGeneric(true)}
                        canShowMoreChildren={()=>canShowMoreChildrenGeneric(true)}
                        handleClickMore={()=>handleClickMoreGeneric(true)}
                        handleClickLess={()=>handleClickLessGeneric(true)}
                    />
                    :null}
                </div>
            
            </div>
            <div className="tirpTimeLine">
                {updateTimeLine()}
                <canvas className="canvas" ref={chartContainer} />
            </div>
        </div>
    );
  }
  
  export default Parent;