import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>
        <u>Welcome to Pokédex Lite!</u>
      </h1>
      <h2 style={{ marginBottom: "30px" }}>Select a search method to begin</h2>
      <div className="homeSelection">
        <Link to="/generation">
          <div className="selectionContainer">
            <h1>GENERATION</h1>
            <div id="imageContainer">
              <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/07/Pokemon-video-game-series-franchise.jpg" />
            </div>
          </div>
        </Link>
        <Link to="/region">
          <div className="selectionContainer">
            <h1>REGION</h1>
            <div id="imageContainer">
              <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/07/Pokemon-video-game-series-franchise.jpg" />
            </div>
          </div>
        </Link>
        <Link to="/pokedex">
          <div className="selectionContainer">
            <h1>POKÉDEX</h1>
            <div id="imageContainer">
              <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/07/Pokemon-video-game-series-franchise.jpg" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
