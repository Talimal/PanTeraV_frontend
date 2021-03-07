import React, {useEffect, useState} from 'react';
import 'react-tree-graph/dist/style.css';
import Parent from './Parent';
import './TreeView.css';
import TIRP from '../TIRP'


const TreeView = (props) => {

const [isOK,setisOK]=useState(false);
const [root,setRoot]=useState();
const [startChildren,setStartChildren]=useState([]);
const [endChildren,setEndChildren]=useState([]);
const [startsWithMap,setStartMap] = useState(new Map());
const [endsWithMap,setEndMap] = useState(new Map());


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
    fetch('http://127.0.0.1:5000/startData')
  .then(response => response.json())
  .then(res => {
    for (var entry in res){
      let childrenArray=[];
      let tirp = desirializeTIRP(entry);
      let value = res[entry];//array of TIRP children
      for (var child in value){
        // saving only the next level of the tree
        if (JSON.parse(value[child]).size===JSON.parse(entry).size+1){
          let childTIRP = desirializeTIRP(value[child]);
          childrenArray.push(childTIRP);
        }
      }
      // startsWithMap.set(tirp,childrenArray);
      setStartMap(new Map(startsWithMap.set(tirp,childrenArray)));
  }
  setRoot(new TIRP(0,[],[],0,0,[]));
  setStartChildren(getFirstTreeLevel());
});
 

fetch('http://127.0.0.1:5000/endData')
  .then(response => response.json())
  .then(res => {
    for (var entry in res){
      let childrenArray=[];
      let tirp = desirializeTIRP(entry);
      let value = res[entry];//array of TIRP children
      for (var child in value){
        // saving only the next level of the tree
        let childTIRP = desirializeTIRP(value[child]);
        childrenArray.push(childTIRP);
        }
      // endsWithMap.set(tirp,childrenArray);
      setEndMap(new Map(endsWithMap.set(tirp,childrenArray)));
    }
      setEndChildren(getFirstEndTreelevel());
      setisOK(true);
  })
 
  },[]);

const getFirstTreeLevel = () =>{
  let firstTreeLevel=[];
  for (const[tirp,_] of startsWithMap){
    if (tirp.getSize()===1){
      firstTreeLevel.push(tirp);
    }
  }
 
  return firstTreeLevel;
}

const getFirstEndTreelevel = () =>{
  let firstTreeLevel=[];
  for (const[tirp,endChildren] of endsWithMap){
    if (endChildren.length===0){
      firstTreeLevel.push(tirp);
    }
  }
  return firstTreeLevel;
}
 
  const findFather = (node)=>{
    if (node.equalTirp(root)){
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
    if (rootNode.equalTirp(root)){
      return startChildren;
    }
    else{
      for (const[tirp,value] of startsWithMap){
        if(tirp.equalTirp(rootNode)){
          return value;
        }
      }
    }    
  }

  const getChildrenEndInNode = (rootNode)=>{
    if (rootNode.equalTirp(root)){
      return endChildren;
    }
    else{
      for (const[tirp,value] of endsWithMap){
        if(tirp.equalTirp(rootNode)){
          return value;
        }
      } 
    }
}

  const isComplexNode = (tirpNode)=>{
    for (const[tirp,children] of startsWithMap){
      if(tirp.equalTirp(tirpNode)){
        return (children.length>0)
      }
    }
    return false;
}


  return (
    <div className="mainPage">
      {isOK?
        <Parent root={root}
          startChildren={startChildren}
          endChildren={endChildren}
          handleClickPrevious={handleClickPrevious}
          getChildrenOfRoot={getChildrenOfRoot}
          getChildrenEnd={getChildrenEndInNode}
          isComplexNode={isComplexNode}
          mapSize={mapSize}
          getRoot = {getRoot}>
        </Parent>
      :null}
      
    </div>
  );
}

export default TreeView;