import React, { useState, useContext, useEffect } from "react";
import { Navigation } from "../App";
import { cleanTitle } from "../Assets/cleanup";

export default function Location() {
  const nav = useContext(Navigation);

  const [locationData, setLocationData] = useState("");

  console.log(locationData);

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
      <div>
        <h3>{cleanTitle(props.data.name)}</h3>
        <h4>{props.data.url}</h4>
      </div>
    );
  }

  function ShowLocation() {
    return (
      <>
        <div className="locationHeader">
          <h1>{cleanTitle(locationData.name)}</h1>
        </div>
        <div>
          {locationData.areas.map((data, index) => (
            <ListAreas key={index} data={data} />
          ))}
        </div>
      </>
    );
  }

  function Placeholder() {
    return (
      <>
        <div className="locationHeader">
          <h1>Loading Location, please wait...</h1>
        </div>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div className="locationDetail">
      {locationData ? <ShowLocation /> : <Placeholder />}
    </div>
  );
}
