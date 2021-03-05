import React from 'react';
import './App.css';
import TreeView from './Components/TreeView';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import MainMenu from './Components/MainMenu';
import Graphs from './Components/Graphs';
import UploadData from './Components/UploadData';


const App = (props) => {


  return (
      <Router>
          <Route path={["/","/UploadData"]} exact>
              <MainMenu/>
              <UploadData/>
          </Route>
          <Route path="/TreeView" exact>
          <MainMenu/>
          <TreeView/>
          </Route>
          <Route path="/graphs" exact>
          <MainMenu/>
          <Graphs/>
          </Route>
      </Router>
  );
}

export default App;