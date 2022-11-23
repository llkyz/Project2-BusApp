import { useState, useEffect } from "react";
import { LoadingImg } from "../cleanup";

export default function Abilities(props) {
  return (
    <div className="abilities">
      <h1>Abilities</h1>
      {props.data.map((data, index) => (
        <Ability key={index} data={data} />
      ))}
    </div>
  );
}

function Ability(props) {
  const [visibility, setVisibility] = useState();

  let name = props.data.ability.name.split("-");
  name = name
    .map((data) => data[0].toUpperCase() + data.substring(1, data.length))
    .join(" ");

  function toggleVisibility() {
    if (visibility) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }

  return (
    <div style={{ width: "fit-content", margin: "0 auto" }}>
      <h2 onClick={toggleVisibility} style={{ cursor: "pointer" }}>
        {name}
      </h2>
      {visibility ? <AbilityDetails data={props.data.ability.url} /> : ""}
    </div>
  );
}

function AbilityDetails(props) {
  const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(props.data);
      let data = await response.json();
      let shortEffect = "";
      let effect = "";

      if (data.effect_entries.length === 0) {
        setDetails({ shortEffect: "No details found", effect: "" });
      } else {
        for (let x of data.effect_entries) {
          if (x.language.name === "en") {
            shortEffect = x.short_effect;
            effect = x.effect;
          }
        }
        setDetails({ shortEffect: shortEffect, effect: effect });
      }
    };
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: "70%", margin: "0 auto 50px auto" }}>
      {details ? (
        <>
          <p style={{ fontWeight: "bold" }}>{details.shortEffect}</p>
          <p>{details.effect}</p>
        </>
      ) : (
        <LoadingImg />
      )}
    </div>
  );
}
