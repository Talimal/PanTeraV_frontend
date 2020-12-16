import React, { useState,useEffect, useRef } from 'react';
import 'react-tree-graph/dist/style.css';
import './App.css';
import TreeView from './TreeView';
import dataJson from './data'


const App = (props) => {

  const [data,setData]=useState(dataJson);
  const isDone=useRef(true);

  // useEffect(() => {
  //     fetch('http://127.0.0.1:5000/data')
  //       .then(response => response.json()).then(res=>{
  //         console.log(res);
  //         isDone.current=true;
  //         setData(res);}
  //         );
  // },[])


  return (
   <div>
      {isDone.current?
        <TreeView>
          data={data}
        </TreeView>
        :null}
  </div>
  );
}

export default App;