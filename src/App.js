import "./App.css";
import React, { useState } from "react";
import Home from "./Components/Home";
import Generation from "./Components/Generation";
import Region from "./Components/Region";
import Pokedex from "./Components/Pokedex";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <div className="header">
          <div className="searchBy">
            <h4>Search By</h4>
            <Link to="/generation">
              <p>Generation</p>
            </Link>
            <Link to="/region">
              <p>Region</p>
            </Link>
            <Link to="/pokedex">
              <p>Pokedex</p>
            </Link>
          </div>
          <Link to="/">
            <h1>POKÉDEX LITE</h1>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/region" element={<Region />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
