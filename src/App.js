import React,  { Children, useState } from 'react';
import 'react-tree-graph/dist/style.css';
import data from './data';
import './App.css';
import Parent from './Parent';


const App = (props) => {

  const [root, setRoot] = useState(data);
  const [children, setChildren] = useState(root.children);
  let history={};


  const addToHistory = (rootObject)=>{
    console.log(rootObject.name);
    console.log(rootObject.children);
    history[rootObject.name]=rootObject.children;
    console.log("history is: "+history.length);
  }

  const findFather = (rootNode,data)=>{
    data.children.forEach(node => {
      let nodesChildren = node.children.map((child)=>child.name);
      if (nodesChildren.includes(rootNode.name)) return node;
      else
        node.children.forEach(nodeChild=>{
          findFather(rootNode,nodeChild);
        })
    });
  }


  const handleClickPrevious = (rootNode)=>{
    return findFather(rootNode,data);
    // setRoot(last);
    // setChildren(root.children);
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
        addToHistory={addToHistory}
        handleClickPrevious={handleClickPrevious}
      >
      </Parent>
    </div>
  );
}

export default App;