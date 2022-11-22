import { useState, useEffect } from "react";

export default function MoveEntry(props) {
  const [visibility, setVisibility] = useState();

  function toggleVisibility() {
    if (visibility) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }

  return (
    <>
      <tr>
        <td>
          <h3 onClick={toggleVisibility} style={{ cursor: "pointer" }}>
            {props.data.name}
          </h3>
        </td>
        <td>
          <h3>{props.data.level}</h3>
        </td>
        <td>
          <h3>{props.data.method}</h3>
        </td>
      </tr>
      {visibility ? <MoveDetails data={props.data.url} /> : ""}
    </>
  );
}

function MoveDetails(props) {
  const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(props.data);
      let data = await response.json();
      let effect_chance = data.effect_chance;
      let effect = data.effect_entries[0].short_effect;
      effect = effect.replaceAll("$effect_chance", effect_chance);
      let power = data.power;
      if (power === null) {
        power = "N/A";
      }
      let accuracy = data.accuracy;
      if (accuracy === null) {
        accuracy = "N/A";
      }

      setDetails({
        power: power,
        accuracy: accuracy,
        pp: data.pp,
        effect: effect,
      });
    };
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {details ? (
        <>
          <tr
            className="details"
            style={{ outline: "solid black", outlineOffset: "-3px" }}
          >
            <td>
              <p>Power: {details.power}</p>
            </td>
            <td>
              <p>Accuracy: {details.accuracy}</p>
            </td>
            <td>
              <p>PP: {details.pp}</p>
            </td>
          </tr>
          <tr className="details">
            <th colSpan="3">
              <p className="description">{details.effect}</p>
            </th>
          </tr>
        </>
      ) : (
        <tr>
          <th colSpan="3">
            <p>Loading...</p>
          </th>
        </tr>
      )}
    </>
  );
}
