import "./App.css";
import React, { useState, useEffect } from "react";
import config from "./config";

// const FetchUser = async (berryId) => {
//   const response = await fetch(ENDPOINT_BERRY + berryId);
//   const data = await response.json();
//   return data;
// };

// console.log(FetchUser(1));

console.log(config.BASE_API_DOMAIN);
console.log(config.BASE_API_DOMAIN + config.ENDPOINT_BERRY + "1");

function App() {
  const [results, setResults] = useState("");

  const berryId = 1;

  useEffect(() => {
    const getResults = async (myBerry) => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_BERRY + myBerry
      );
      const data = await response.json();
      setResults(data);
    };

    getResults(berryId);
  }, []);

  return (
    <div className="App">
      <p>{JSON.stringify(results)}</p>
      <p>{results ? results.firmness.name : ""}</p>
    </div>
  );
}

export default App;
