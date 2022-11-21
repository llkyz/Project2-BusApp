import "./App.css";
import React, { useState, createContext } from "react";
import Home from "./Components/Home";
import Generation from "./Components/Generation";
import RegionList from "./Components/RegionList";
import Pokedex from "./Components/Pokedex";
import { Route, Routes, Link } from "react-router-dom";

export const Navigation = createContext();

function App() {
  const initialState = {
    regionList: "",
    region: "",
    regionData: "",
    location: "",
  };

  const [data, setData] = useState(initialState);

  function set(mydata) {
    setData({ ...data, ...mydata });
  }

  function clearNavigation(myData) {
    setData({ ...initialState, ...myData });
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
              <p onClick={() => clearNavigation()}>Generation</p>
            </Link>
            <Link to="/region">
              <p
                onClick={() => clearNavigation({ regionList: data.regionList })}
              >
                Region
              </p>
            </Link>
            <Link
              to="/pokedex/full"
              state={{ source: "None", title: "Searching entire Pokédex" }}
            >
              <p onClick={() => clearNavigation()}>Pokedex</p>
            </Link>
          </div>
        </div>
        <Navigation.Provider value={{ data, set }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generation" element={<Generation />} />
            <Route path="/region" element={<RegionList />} />
            <Route path="/pokedex/:type" element={<Pokedex />} />
          </Routes>
        </Navigation.Provider>
      </div>
    </div>
  );
}

export default App;
