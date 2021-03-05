import React from 'react';
import './UploadData.css';
import search from '../images/search.png'

const UploadData = (props) => {

  
    // const handleFileChosen = (e)=>{
    //   const file = document.getElementById('fileUpload').files[0];
    //   console.log(file);
    // }
  return (

    <div className="fileinputs">
	    <input type="file" className="file" />
      <div className="fakefile">
        <input value="choose file" readOnly={true}/>
        <img src={search} alt="search"/>
      </div>
    </div>
  



    
   
  );
}

export default UploadData;