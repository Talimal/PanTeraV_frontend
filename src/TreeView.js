import React, {useEffect} from 'react';
import 'react-tree-graph/dist/style.css';
import Parent from './Parent';
import './TreeView.css';
import data from './data';
import TIRP from './TIRP'


const TreeView = (props) => {

 let startsWithMap= new Map();

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
      console.log("entry size: "+JSON.parse(entry).size)
      let value = res[entry];
      console.log("value: "+value);
      console.log("entry: "+entry);
      console.log("value children: "+value.children);
      for (var child in value.children){
        console.log("child size 1: "+JSON.parse(child).size);
        console.log("another one");
      }
      // startsWithMap.set(desirializeTIRP(entry),value.map((child)=>desirializeTIRP(child)));
      
  }})
 
  }, []);

  const root=data;
  const children=root.children;
  let myMap=new Map();

  const setMap = (node)=>{
    myMap.set(node,node.children);
    if (node.children.length>0){
      node.children.map((child)=>setMap(child));
    }
    else
      {myMap.set(node,[]);
      }
  }

  setMap(root);
 
  const findFather = (node)=>{
    for (let [key, value] of myMap) {
      if(value.includes(node)){
         return key;
      }
    }
    return null;
  }


  const handleClickPrevious = (node)=>{
    let father = findFather(node);
    return father;
  }

  const getChildrenOfRoot = (root)=>{
    for (let [key, value] of myMap) {
      if(root===key){
         return value;
      }
    }
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
      <Parent root={root}
        children={children}
        handleClickPrevious={handleClickPrevious}
        getChildrenOfRoot={getChildrenOfRoot}>
      </Parent>
    </div>
  );
}

export default TreeView;