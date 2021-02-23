import React from 'react';
import './App.css';
import TreeView from './TreeView';
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import MainMenu from './MainMenu';


const App = (props) => {


  return (
    <Router>
      <Route path={["/","/UploadData","graphs"]} component={MainMenu}/>
      <Route path="/TreeView" component={TreeView}/>
    </Router>
   
  );
}

export default App;