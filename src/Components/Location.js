import React, { useState, useContext, useEffect } from "react";
import { Navigation } from "../App";
import { cleanTitle } from "../Assets/cleanup";
import Area from "./Area";

export default function Location(props) {
  const nav = useContext(Navigation);
  const [locationData, setLocationData] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(nav.data.location);
      let data = await response.json();
      setLocationData(data);
    };

    getLocation();
    // eslint-disable-next-line
  }, []);

  function ListAreas(props) {
    return (
      <div className="areaContainer">
        <h1>{cleanTitle(props.data.name)}</h1>
        <h4>
          <Area url={props.data.url} setSpecies={props.setSpecies} />
        </h4>
      </div>
    );
  }

  function goBack() {
    nav.set({ location: "" });
    setLocationData("");
  }

  function ShowLocation() {
    return (
      <>
        <div className="locationHeader">
          <i className="arrowBack" onClick={goBack}></i>
          <h1>{cleanTitle(locationData.name)}</h1>
        </div>
        <div className="areas">
          {locationData.areas.length !== 0 ? (
            locationData.areas.map((data, index) => (
              <ListAreas
                key={index}
                data={data}
                setSpecies={props.setSpecies}
              />
            ))
          ) : (
            <h3>No areas found</h3>
          )}
        </div>
      </>
    );
  }

  function Placeholder() {
    return (
      <>
        <div className="locationHeader">
          <h1>Loading...</h1>
        </div>
        <div>
          <h2>Loading areas, please wait...</h2>
        </div>
      </>
    );
  }

  return (
    <div className="locationDetail">
      {locationData ? <ShowLocation /> : <Placeholder />}
    </div>
  );
}
