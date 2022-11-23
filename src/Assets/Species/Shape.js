import { Link } from "react-router-dom";

export default function Shape(props) {
  let name = "";
  if (props.data) {
    name = props.data.name.toUpperCase();
  }

  return (
    <>
      {props.data ? (
        <Link
          to="/pokedex/other"
          state={{
            source: props.data.url,
            title: `Browsing Shape (${name})`,
          }}
        >
          <p
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="link"
          >
            {name}
          </p>
        </Link>
      ) : (
        "No Shape"
      )}
    </>
  );
}
