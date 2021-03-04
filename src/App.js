import React from 'react';
import './App.css';
import TreeView from './TreeView';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import MainMenu from './MainMenu';
import Graphs from './Graphs'


const App = (props) => {


  return (
      <Router>
          <Route path={["/","/UploadData"]} component={MainMenu}/>
          <Route path="/TreeView" component={TreeView}/>
          <Route path="/graphs" component={Graphs}/>
      </Router>
  );
}

export default App;