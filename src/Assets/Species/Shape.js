import { Link } from "react-router-dom";

export default function Shape(props) {
  let name = "";
  if (props.data) {
    name =
      props.data.name[0].toUpperCase() +
      props.data.name.substring(1, props.data.name.length);
  }

  return (
    <div>
      <p>Shape</p>
      {props.data ? (
        <Link
          to="/pokedex/other"
          state={{
            source: props.data.url,
            title: `Browsing Shape (${name})`,
          }}
        >
          <p>{name}</p>
        </Link>
      ) : (
        "No Shape"
      )}
    </div>
  );
}
