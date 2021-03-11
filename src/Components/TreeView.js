import React from 'react';
import 'react-tree-graph/dist/style.css';
import Parent from './Parent';
import './TreeView.css';


const TreeView = ({startsWithMap,endsWithMap,root,startChildren,
                      endChildren,tirpSymbolName}) => {
 
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
      {
        <Parent 
          propRoot={root}
          propStartChildren={startChildren}
          propEndChildren={endChildren}
          propHandleClickPrevious={handleClickPrevious}
          getChildrenOfRoot={getChildrenOfRoot}
          getChildrenEnd={getChildrenEndInNode}
          propIsComplexNode={isComplexNode}
          getRoot = {getRoot}
          tirpSymbolName={tirpSymbolName}
          >
        </Parent>
      }
      
    </div>
  );
}
export default TreeView;