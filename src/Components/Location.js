import React, { useState, useEffect } from "react";
import { cleanTitle } from "../Assets/cleanup";
import Area from "./Area";
import { LoadingImg } from "../Assets/cleanup";
import { LoadingImgLarge } from "../Assets/cleanup";

export default function Location(props) {
  const [locationData, setLocationData] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(props.data);
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
          <Area url={props.data.url} />
        </h4>
      </div>
    );
  }

  function goBack() {
    props.reset();
    setLocationData();
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
              <ListAreas key={index} data={data} />
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
          <LoadingImg />
        </div>
        <div>
          <LoadingImgLarge />
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
