import { useState } from "react";
import pokemonColors from "../pokemonColors";
import { Link } from "react-router-dom";

export default function Color(props) {
  const [active, setActive] = useState(false);

  let styles = {
    color: `${active ? "white" : "black"}`,
    border: `3px solid ${pokemonColors[props.data.name]}`,
    backgroundColor: `${active ? pokemonColors[props.data.name] : ""}`,
  };

  return (
    <Link
      to="/pokedex/other"
      state={{
        source: props.data.url,
        title: `Searching by Color (${props.data.name.toUpperCase()})`,
      }}
    >
      <div
        className="link"
        style={styles}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {props.data.name.toUpperCase()}
      </div>
    </Link>
  );
}
