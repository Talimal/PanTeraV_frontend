import React from 'react';
import './UploadData.css';
import search from '../images/search.png'

const UploadData = (props) => {

  
    const handleFileChosen = (e)=>{
      const file = document.getElementById('actualFile').files[0];
      console.log(file);
    }

    const handleNormalFileChosen = (e)=>{
      const file = document.getElementById('input').files[0];
      console.log(file);
    }
  return (

    <div className="mainDiv">
      <div className="fileinputs">
        <input type="file" 
                className="file"
                id="actualFile"
                 />
        <div className="fakefile">
          <input value="choose file"
                  onChange={()=>console.log("heree")}/>
          <img src={search} alt="search"/>
        </div>
      </div>
      <div className="normalInput">
        <input type="file" id="input"></input>
      </div>
      <button className="uploadButtonNormal"
              onClick={(e)=>handleNormalFileChosen(e)}>Upload1</button>
       <button className="uploadButtonFake"
              onClick={(e)=>handleFileChosen(e)}>Upload2</button>
    </div>
  



    
   
  );
}

export default UploadData;