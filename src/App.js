// import React ,{useEffect, useRef, useState}from 'react';
// import './App.css';
// import TIRP from './TIRP';
// import TreeView from './Components/TreeView';
// import {BrowserRouter as Router,Route} from 'react-router-dom'
// import MainMenu from './Components/MainMenu';
// import Graphs from './Components/Graphs';
// import UploadData from './Components/UploadData';
// import RawDataInterval from './RawDataInterval';

// const App = (props) => {

//     const [isStartData,setIsStartData]=useState(false);
//     const [isEndData,setIsEndData]=useState(false);
//     const [isNames,setIsNames]=useState(false);
//     const [isRawData,setRawData]=useState(false);
//     const [root,setRoot]=useState();
//     const [startChildren,setStartChildren]=useState([]);
//     const [endChildren,setEndChildren]=useState([]);
//     const [startsWithMap,setStartMap] = useState(new Map());
//     const [endsWithMap,setEndMap] = useState(new Map());
//     const tirpSymbolName = useRef({});
//     const allTirps = useRef({});
//     const [rawDataMap,setRawMap] = useState(new Map());

//     const entityRawData = new Map();

//     const myMap = useRef(new Map());

//     const desirializeTIRP = (entry) =>{
//     const size = JSON.parse(entry).size;
//     const symbols = JSON.parse(entry).symbols;
//     const relations = JSON.parse(entry).relations;
//     const numSupEnt = JSON.parse(entry).num_supporting_entities;
//     const meanHorSup = JSON.parse(entry).mean_horizontal_support;
//     const occurences = JSON.parse(entry).occurences;
//     const newTirp = new TIRP(size,symbols,relations,numSupEnt,meanHorSup,occurences);
//     tirpSymbolName.current[symbols]=newTirp;
//     allTirps.current[symbols]=newTirp;
//     return newTirp;
//     }

//     const desirializeInterval = (interval) =>{
//       const symbol =  JSON.parse(interval).symbol;
//       const startTime =  JSON.parse(interval).start_time;
//       const endTime =  JSON.parse(interval).end_time;
//       const newInterval = new RawDataInterval(symbol,startTime,endTime);
//       return newInterval;
//       }

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/startData')
//   .then(response => response.json())
//   .then(res => {
//     for (var entry in res){
//       let childrenArray=[];
//       let tirp = desirializeTIRP(entry);
//       let value = res[entry];//array of TIRP children
//       for (var child in value){
//           let childTIRP = desirializeTIRP(value[child]);
//           childrenArray.push(childTIRP);
//       }
//       if (startsWithMap.get(tirp)===undefined){
//       setStartMap(new Map(startsWithMap.set(tirp,childrenArray)))
//       }
//   }
//   setRoot(new TIRP(0,0,[],[],0,0,[]));
//   setStartChildren(getFirstTreeLevel());
//   setIsStartData(true);
// }).then(
 

// fetch('http://127.0.0.1:5000/endData')
//   .then(response => response.json())
//   .then(res => {
//     for (var entry in res){
//       let childrenArray=[];
//       let tirp = desirializeTIRP(entry);
//       let value = res[entry];//array of TIRP children
//       for (var child in value){
//         // saving only the next level of the tree
//         let childTIRP = desirializeTIRP(value[child]);
//         childrenArray.push(childTIRP);
//         }
//       setEndMap(new Map(endsWithMap.set(tirp,childrenArray)));
//     }
//       setEndChildren(getFirstEndTreelevel());
//       setIsEndData(true);
      
//   }).then(
//   fetch('http://127.0.0.1:5000/states')
//   .then(response => response.json())
//   .then(res => {
//     for(var i = 0; i < Object.keys(res).length; i++) {
//       let stringSymbol = Object.keys(res)[i];
//       let tirpName = Object.values(res)[i];
//       tirpSymbolName.current[stringSymbol]=tirpName;
//       allTirps.current[stringSymbol].setName([tirpName]);
//   }
//   let filtered = Object.values(allTirps.current).filter((tirp)=>tirp.getSize()>1);
//   filtered.map((tirp)=>{
//     tirp.setName(tirp.getSymbols().map((symbol)=>{
//       return tirpSymbolName.current[symbol]
//     }))
//   })
//     setIsNames(true);
//   }).
// then(
//   fetch('http://127.0.0.1:5000/rawData')
//   .then(response => response.json())
//   .then(res => {
//     for(var i = 0; i < Object.keys(res).length; i++) {
//       let entityID = JSON.parse(Object.keys(res)[i]);
//       let symbolIntervals = Object.values(res)[i];
//       for(var index in symbolIntervals){
//         let rawData = desirializeInterval(symbolIntervals[index]);
//         if (rawDataMap.get(entityID)===undefined){
//           setRawMap(new Map(rawDataMap.set(entityID,[rawData])))
//           }
//         else{
//           setRawMap(new Map(rawDataMap.set(entityID,Array.from(rawDataMap.get(entityID)).concat([rawData]))))
//         }
//         // if (entityRawData.get(entityID)===undefined){
//         //   entityRawData.set(entityID,[rawData]);
//         // }
//         // else{
//         //   // let arr = Array.from((rawMy.get(entityID))).push(rawData);
//         //   // rawMy.set(entityID,arr);
//         //   entityRawData.get(entityID).push(rawData)
//         // }
//         // if(myMap.current.get(entityID)===undefined){
//         //   console.log("hi")
//         //   myMap.current.set(entityID,[rawData]);
//         // }
//         // else{
//         //   console.log("hhh")
//         //   myMap.current.set(entityID,Array.from(myMap.current.get(entityID)).push(rawData));
//         // }
//       }
//   }
//   setRawData(true);
//   }
// ))))},[]);

//   const getFirstTreeLevel = () =>{
//     let firstTreeLevel=[];
//     for (const[tirp,] of startsWithMap){
//       if (tirp.getSize()===1){
//         firstTreeLevel.push(tirp);
//       }
//     }
   
//     return firstTreeLevel;
//   }
  
//   const getFirstEndTreelevel = () =>{
//     let firstTreeLevel=[];
//     for (const[tirp,endChildren] of endsWithMap){
//       if (endChildren.length===0){
//         firstTreeLevel.push(tirp);
//       }
//     }
//     return firstTreeLevel;
//   }

//   const getTirp = (symbols,relations)=>{
//     for (const[tirp,] of startsWithMap){
//       if (JSON.stringify(tirp.getSymbols())===JSON.stringify(symbols) 
//       && JSON.stringify(tirp.getRelations())===JSON.stringify(relations)){
//         return tirp
//       }
//     }
//   }

//   const getRawData = (entityID,symbols)=>{
//     let rawDataArr=[];
//     let entityIntervals = rawDataMap.get(entityID.toString());
//     for(var interval in entityIntervals){
//         if(symbols.includes(entityIntervals[interval].getSymbol())){
//           rawDataArr.push(entityIntervals[interval]);
//         }
//     }
//     return rawDataArr;
//   }
 
//   return (
//       <div>
//         {isStartData&&isEndData&&isNames&&isRawData?
//         <Router>
//             <Route path={["/","/UploadData"]} exact>
//                 <MainMenu/>
//                 <UploadData/>
//             </Route>
//             <Route path="/TreeView" exact>
//             <MainMenu/>
//             <TreeView 
//                 startsWithMap={startsWithMap}
//                 endsWithMap={endsWithMap}
//                 root={root}
//                 startChildren={startChildren}
//                 endChildren={endChildren}
//                 tirpSymbolName={allTirps.current}
//                 />
//             </Route>
//             <Route path="/graphs" exact>
//             <MainMenu/>
//             <Graphs
//                 getTirp={(symbols,relations)=>getTirp(symbols,relations)}
//                 getRawData={(entityID,symbols)=>getRawData(entityID,symbols)}
//                 />
//             </Route>
//         </Router>
//         :
//         null}
//       </div>
//   );
// }

// export default App;