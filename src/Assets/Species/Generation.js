import { Link } from "react-router-dom";

export default function Generation(props) {
  let name = "Generation " + props.data.name.split("-")[1].toUpperCase();

  return (
    <div>
      <p>Origin</p>
      <Link
        to="/pokedex/generation"
        state={{
          source: props.data.url,
          title: `Browsing ${name}`,
          id: props.data.name,
        }}
      >
        <p>{name}</p>
      </Link>
    </div>
  );
}
