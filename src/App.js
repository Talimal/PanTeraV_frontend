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

  const getLastRoot = ()=>{
    console.log("history on app : "+history)
    let last = history[history.length-1];
    console.log("root is: "+last);
    // setRoot(last);
    // setChildren(root.children);
    return last;
  }

  return (
    <Parent root={root}
      children={children}
      addToHistory={addToHistory}
      getLastRoot={getLastRoot}
    >
    </Parent>
  );
}

export default App;