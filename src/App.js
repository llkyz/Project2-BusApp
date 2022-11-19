import "./App.css";
import React, { useState, createContext } from "react";
import Home from "./Components/Home";
import Generation from "./Components/Generation";
import Region from "./Components/Region";
import Pokedex from "./Components/Pokedex";
import { Route, Routes, Link } from "react-router-dom";

export const Navigation = createContext();

function App() {
  const initialState = {
    searchQueryPokemon: "",
    generation: "",
    generationList: "",
    speciesList: "",
    species: "",
    speciesData: "",
    regionList: "",
    region: "",
  };

  const [data, setData] = useState(initialState);

  function set(myKey, myValue) {
    setData({ ...data, [myKey]: myValue });
  }

  function clearNavigation(myKey, myValue) {
    setData({ ...initialState, [myKey]: myValue });
  }

  return (
    <div className="App">
      <div>
        <div className="header">
          <Link to="/">
            <h1 onClick={clearNavigation}>POKÉDEX LITE</h1>
          </Link>
          <div className="searchBy">
            <h4>Search By</h4>
            <Link to="/generation">
              <p
                onClick={() =>
                  clearNavigation("generationList", data.generationList)
                }
              >
                Generation
              </p>
            </Link>
            <Link to="/region">
              <p onClick={() => clearNavigation("regionList", data.regionList)}>
                Region
              </p>
            </Link>
            <Link to="/pokedex">
              <p
                onClick={() => clearNavigation("speciesList", data.speciesList)}
              >
                Pokedex
              </p>
            </Link>
          </div>
        </div>
        <Navigation.Provider value={{ data, set }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generation" element={<Generation />} />
            <Route path="/region" element={<Region />} />
            <Route path="/pokedex" element={<Pokedex />} />
          </Routes>
        </Navigation.Provider>
      </div>
    </div>
  );
}

export default App;
