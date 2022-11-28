import { Link } from "react-router-dom";

export default function Habitat(props) {
  let name = "";
  if (props.data) {
    name = props.data.name.toUpperCase().replace("-", " ");
  }

  return (
    <>
      {props.data ? (
        <Link
          to={`/pokedex/habitat/${props.data.url.split("/").slice(-2, -1)}`}
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
        "No Habitat"
      )}
    </>
  );
}
