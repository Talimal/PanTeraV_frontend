import React,  { useState } from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import data from './data';
import './App.css';


const App = (props) => {

  const [root, setRoot] = useState(data.name);
  const [children, setChildren] = useState(data.children);


  const handleClick = (event, node) => {
    console.log('handle click ', event);
    console.log('handle click node', node);
    alert(`${node} got clicked`);
  }
  console.log(root);
  console.log(children);


  return (
    <Tree
      animated={true}
      data={data}
      nodeRadius={15}
      margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
      gProps={{
        className: 'node',
        onClick: handleClick
      }}
      height={1100}
      width={960}
      // svgProps={{
      //   transform: 'rotate(90)'}}
      />
  );
}

export default App;