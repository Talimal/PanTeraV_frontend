import React from 'react';
import 'react-tree-graph/dist/style.css';
import data from './data';
import './App.css';
import Parent from './Parent';


const App = (props) => {
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
      if(root==key){
         return value;
      }
    }
  }

  return (
    <div className="mainPage">
      <div className="nav">
        <nav>
          <a> upload data</a>
          <a> entities </a>
          <a> links</a>
          <a> photos</a>
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

export default App;