import React ,{useEffect, useRef, useState}from 'react';
import './App.css';
import TIRP from './TIRP';
import TreeView from './Components/TreeView';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import MainMenu from './Components/MainMenu';
import Graphs from './Components/Graphs';
import UploadData from './Components/UploadData';

const App = (props) => {

    const [isStartData,setIsStartData]=useState(false);
    const [isEndData,setIsEndData]=useState(false);
    const [isNames,setIsNames]=useState(false);
    const [root,setRoot]=useState();
    const [startChildren,setStartChildren]=useState([]);
    const [endChildren,setEndChildren]=useState([]);
    const [startsWithMap,setStartMap] = useState(new Map());
    const [endsWithMap,setEndMap] = useState(new Map());
    const tirpSymbolName = useRef({});
    const allTirps = useRef({});
    let tirpIDCounter=0;

    const desirializeTIRP = (entry) =>{
    const size = JSON.parse(entry).size;
    const symbols = JSON.parse(entry).symbols;
    const relations = JSON.parse(entry).relations;
    const numSupEnt = JSON.parse(entry).num_supporting_entities;
    const meanHorSup = JSON.parse(entry).mean_horizontal_support;
    const occurences = JSON.parse(entry).occurences;
    const newTirp = new TIRP(tirpIDCounter++,size,symbols,relations,numSupEnt,meanHorSup,occurences);
    tirpSymbolName.current[symbols]=newTirp;
    allTirps.current[symbols]=newTirp;
    return newTirp;
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
          let childTIRP = desirializeTIRP(value[child]);
          childrenArray.push(childTIRP);
      }
      setStartMap(new Map(startsWithMap.set(tirp,childrenArray)));
  }
  setRoot(new TIRP(0,0,[],[],0,0,[]));
  setStartChildren(getFirstTreeLevel());
  setIsStartData(true);
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
      setEndMap(new Map(endsWithMap.set(tirp,childrenArray)));
    }
      setEndChildren(getFirstEndTreelevel());
      setIsEndData(true);
      
  })
  fetch('http://127.0.0.1:5000/states')
  .then(response => response.json())
  .then(res => {
    for(var i = 0; i < Object.keys(res).length; i++) {
      let stringSymbol = Object.keys(res)[i];
      let tirpName = Object.values(res)[i];
      tirpSymbolName.current[stringSymbol]=tirpName;
      allTirps.current[stringSymbol].setName([tirpName]);
  }
  let filtered = Object.values(allTirps.current).filter((tirp)=>tirp.getSize()>1);
  filtered.map((tirp)=>{
    tirp.setName(tirp.getSymbols().map((symbol)=>{
      return tirpSymbolName.current[symbol]
    }))
  })
    setIsNames(true);
  }
  )},[]);

  const getFirstTreeLevel = () =>{
    let firstTreeLevel=[];
    for (const[tirp,] of startsWithMap){
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
  const getTirpByID = (tirpID)=>{
    for (const[tirp,] of startsWithMap){
      if (tirp.getID()===tirpID){
        return tirp
      }
    }
  }
 
  return (
      <div>
        {isStartData&&isEndData&&isNames?
        <Router>
            <Route path={["/","/UploadData"]} exact>
                <MainMenu/>
                <UploadData/>
            </Route>
            <Route path="/TreeView" exact>
            <MainMenu/>
            <TreeView 
                startsWithMap={startsWithMap}
                endsWithMap={endsWithMap}
                root={root}
                startChildren={startChildren}
                endChildren={endChildren}
                tirpSymbolName={allTirps.current}
                />
            </Route>
            <Route path="/graphs" exact>
            <MainMenu/>
            <Graphs
                getTirp={(tirp)=>getTirpByID(tirp)}
                />
            </Route>
        </Router>
        :
        null}
      </div>
  );
}

export default App;