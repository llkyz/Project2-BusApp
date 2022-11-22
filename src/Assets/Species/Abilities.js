import { useState, useEffect } from "react";

export default function Abilities(props) {
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
    <div>
      <div onClick={toggleVisibility}>{name}</div>
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

      for (let x of data.effect_entries) {
        if (x.language.name === "en") {
          shortEffect = x.short_effect;
          effect = x.effect;
        }
      }
      setDetails({ shortEffect: shortEffect, effect: effect });
    };
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {details ? (
        <>
          <p>{details.shortEffect}</p>
          <p>{details.effect}</p>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
