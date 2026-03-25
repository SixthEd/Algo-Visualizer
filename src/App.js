import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Sorting from './Components/Sorting/Sorting.jsx';
import Dsa from './Components/DSAandAlgo/Dsa.jsx';
import PathFinder from './Components/Path Finder/PathFinder.jsx';
import Home from "./Components/Cards.jsx";
import { Component } from 'react';
function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/*" element={<Home/>}></Route>
        <Route path='/sorting-algo' element={<Sorting/>}></Route>
        <Route path='/dsa-algo' element={<Dsa/>}></Route>
        <Route path='/pathFinder-algo' element={<PathFinder/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
