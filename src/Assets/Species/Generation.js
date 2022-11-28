import { Link } from "react-router-dom";

export default function Generation(props) {
  let name = "GENERATION " + props.data.name.split("-")[1].toUpperCase();

  return (
    <>
      <Link
        to={`/pokedex/generation/${props.data.url.substring(
          props.data.url.length - 2,
          props.data.url.length - 1
        )}`}
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
    </>
  );
}
