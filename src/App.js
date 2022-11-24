import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import Home from "./Components/Home";
import Generation from "./Components/Generation";
import RegionList from "./Components/RegionList";
import Region from "./Components/Region";
import Pokedex from "./Components/Pokedex";
import Species from "./Components/Species";
import { Route, Routes, Link } from "react-router-dom";

export const FavouriteList = createContext();

function App() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites"));
    if (storedFavs) {
      setFavourites(storedFavs);
    }
  }, []);

  return (
    <div className="App">
      <FavouriteList.Provider value={{ favourites, setFavourites }}>
        <div>
          <div className="header">
            <Link to="/">
              <h1>POKÉDEX LITE</h1>
            </Link>
            <div className="searchBy">
              <h4>Search By</h4>
              <Link to="/generation">
                <p>Generation</p>
              </Link>
              <Link to="/regionlist">
                <p>Region</p>
              </Link>
              <Link
                to="/pokedex/full"
                state={{ source: "None", title: "Searching entire Pokédex" }}
              >
                <p>Pokedex</p>
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generation" element={<Generation />} />
            <Route path="/regionlist" element={<RegionList />} />
            <Route path="/region/:id" element={<Region />} />
            <Route path="/pokedex/:type" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<Species />} />
          </Routes>
        </div>
      </FavouriteList.Provider>
    </div>
  );
}

export default App;
