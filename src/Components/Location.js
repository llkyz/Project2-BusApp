import React, { useState, useEffect } from "react";

export default function Location(props) {
  const [LocationData, setLocationData] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(props.url);
      let data = await response.json();

      setLocationData(data);
    };

    getLocation();
  }, []);

  return (
    <div>
      <h1>Location</h1>
      <p>{LocationData ? JSON.stringify(LocationData) : ""}</p>
    </div>
  );
}
