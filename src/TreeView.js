import React, {useEffect, useState} from 'react';
import 'react-tree-graph/dist/style.css';
import Parent from './Parent';
import './TreeView.css';
import data from './data';
import TIRP from './TIRP'
import { dragDisable } from 'd3';


const TreeView = (props) => {

const [isOK,setisOK]=useState(false);
const [root,setRoot]=useState();
const [children,setChildren]=useState([]);
const [startsWithMap,setMap] = useState(new Map());


  const desirializeTIRP = (entry) =>{
    const size = JSON.parse(entry).size;
    const symbols = JSON.parse(entry).symbols;
    const relations = JSON.parse(entry).relations;
    const numSupEnt = JSON.parse(entry).num_supporting_entities;
    const meanHorSup = JSON.parse(entry).mean_horizontal_support;
    const occurences = JSON.parse(entry).occurences;
    return new TIRP(size,symbols,relations,numSupEnt,meanHorSup,occurences);
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data')
  .then(response => response.json())
  .then(res => {
    for (var entry in res){
      let childrenArray=[];
      let tirp = desirializeTIRP(entry);
      let value = res[entry];//array of TIRP children
      for (var child in value){
        let childTIRP = desirializeTIRP(value[child]);
        childrenArray.push(childTIRP);
      }
      // startsWithMap.set(tirp,childrenArray);
      setMap(new Map(startsWithMap.set(tirp,childrenArray)));
  }
  setRoot(new TIRP(0,[],[],0,0,[]));
  setChildren(getFirstTreeLevel());
  setisOK(true);
})
 
  }, []);

const getFirstTreeLevel = () =>{
  let firstTreeLevel=[];
  for (const[tirp,value] of startsWithMap){
    if (tirp.getSize()===1){
      firstTreeLevel.push(tirp);
    }
  }
  return firstTreeLevel;
}
  // const root=data;

  // const children=root.children;
  // console.log("hii : "+children);
  // let myMap=new Map();

  // const setMap = (node)=>{
  //   myMap.set(node,node.children);
  //   if (node.children.length>0){
  //     node.children.map((child)=>setMap(child));
  //   }
  //   else
  //     {myMap.set(node,[]);
  //     }
  // }

  // setMap(root);
 
  const findFather = (node)=>{
    if (node===root){
      return null;
    }
    for (const[tirp,children] of startsWithMap) {
      if(children.includes(node)){
         return tirp;
      }
    }
    return getRoot();
  }

  const getRoot = () =>{return root};

  const handleClickPrevious = (node)=>{
    let father = findFather(node);
    return father;
  }

  const mapSize = ()=> {return startsWithMap.size};

  const getChildrenOfRoot = (rootNode)=>{
   
    console.log("papi: "+rootNode);
    for (const[tirp,tirpChildren] of startsWithMap) {
      if(tirp===rootNode){
        console.log("hereee");
         return tirpChildren;
      }
    }
    return children;
  }

  const isComplexNode = (tirpNode)=>{
    for (const[tirp,children] of startsWithMap){
      if(tirp===tirpNode){
        return (children.length>0)
      }
    }
    return false;
}


  return (
    <div className="mainPage">
      <div className="nav">
        <nav>
            <a href="https://stackoverflow.com/questions/46224687/how-to-export-and-import-class-properly-in-javascript-es6"> upload data</a>
            <a href="https://stackoverflow.com/questions/46224687/how-to-export-and-import-class-properly-in-javascript-es6"> entities </a>
            <a href="https://stackoverflow.com/questions/46224687/how-to-export-and-import-class-properly-in-javascript-es6"> links</a>
            <a href="https://stackoverflow.com/questions/46224687/how-to-export-and-import-class-properly-in-javascript-es6"> photos</a>
        </nav>
      </div>
      {isOK?
        <Parent root={root}
          children={children}
          handleClickPrevious={handleClickPrevious}
          getChildrenOfRoot={getChildrenOfRoot}
          isComplexNode={isComplexNode}
          mapSize={mapSize}
          getRoot = {getRoot}>
        </Parent>
      :null}
      
    </div>
  );
}

export default TreeView;