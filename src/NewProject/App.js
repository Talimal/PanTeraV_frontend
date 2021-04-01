import React ,{useEffect, useRef, useState}from 'react';
import Axios from "axios";
import RelationVector from './DataStructures/RelationVector';
import TIRP from './DataStructures/TIRP';
import ExploreSymbol from './ExploreSymbol';

const App = (props) => {

  const relationsVectorsJson = useRef({});
  const relationsVectorsList = useRef([]);
  const [tirp,setTirp] = useState(null);
  const [readyToExplore,setReadyToExplore] = useState(false);

  const createRelationsJson = (tirpsJson)=>{
    let relationsJson = {};
    for(var index in tirpsJson){
      const symbolRelationsArr =index.split(',');
      const prefixSymbol = symbolRelationsArr[0];
      const prefixRelations = 
      symbolRelationsArr[1]!==""?symbolRelationsArr.splice(1,symbolRelationsArr.length-1)
      : [];
      const tirps = [];
      for(var tirpIndex in tirpsJson[index]){
        const size = tirpsJson[index][tirpIndex]['size'];
        const symbols = tirpsJson[index][tirpIndex]['symbols'];
        const relations = tirpsJson[index][tirpIndex]['relations'];
        const occurences = tirpsJson[index][tirpIndex]['occurences'];
        const numSupEnt = tirpsJson[index][tirpIndex]['num_supporting_entities'];
        const meanHorSup = tirpsJson[index][tirpIndex]['mean_horizontal_support'];
        const newTirp = new TIRP(size,symbols,relations,numSupEnt,meanHorSup,occurences);
        tirps.push(newTirp);
        if(size===3){
          setTirp(newTirp);
        }
      }
      relationsJson["["+prefixSymbol+","+prefixRelations+"]"] = tirps;
      
    }
    return relationsJson;
  }
  const compareArrays = (arr1,arr2) => {
    // compare lengths - can save a lot of time 
   if (arr1.length !== arr2.length)
     return false;

   for (var i = 0, l=arr1.length; i < l; i++) {
         if (arr1[i]!==arr2[i])
             return false;       
   }           
     
   return true;
 }

  useEffect(() => {
    const url = 'http://127.0.0.1:5000/vectorSymbols';
    Axios.get(url).then(
      (response)=>{
        const relationVectorsJson = response.data;
        for(var indexVector in relationVectorsJson){
          let prefixJson = {};
          let nextJson = {};

          
          const vector = relationVectorsJson[indexVector];

          const vectorSymbol = vector['symbol'];
          const vectorRelations = vector['relations'];
          const prefixTirpsJson = vector['prefix'];
          const nextTirpsJson = vector['next'];

          prefixJson = createRelationsJson(prefixTirpsJson);
          nextJson = createRelationsJson(nextTirpsJson);
          
          const relationsVector = new RelationVector(vectorSymbol,vectorRelations,
                                                  prefixJson,nextJson);
          relationsVectorsJson.current["["+relationsVector.getSymbol()+","+relationsVector.getRelationVector()+"]"]=relationsVector;
          relationsVectorsList.current.push(relationsVector);
        }
        setReadyToExplore(true);
      }
      );
  },[]);

  const getNextVectorTirps = (symbol, relations)=>{
    for(var vectorIndex in relationsVectorsList.current){
      let vector = relationsVectorsList.current[vectorIndex];
      if(symbol===vector.getSymbol() && compareArrays(vector.getRelationVector(),relations)){
        return vector.getNextTirps();
      }
    }
    return null;
  }
  const getPrevVectorTirps = (symbol, relations)=>{
    for(var vectorIndex in relationsVectorsList.current){
      let vector = relationsVectorsList.current[vectorIndex];
      if(symbol===vector.getSymbol() && compareArrays(vector.getRelationVector(),relations)){
        return vector.getPrefixTirps();
      }
    }
    return null;
  }
 
  return (
      <div>
        {readyToExplore && tirp!==null?
        <ExploreSymbol 
            tirp={tirp} 
            getNextVectorTirps={getNextVectorTirps}
            getPrevVectorTirps={getPrevVectorTirps}
          />
        :null}
      </div>
  );
}

export default App;