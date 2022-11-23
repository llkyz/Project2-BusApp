import { Link } from "react-router-dom";

export default function Generation(props) {
  let name = "GENERATION " + props.data.name.split("-")[1].toUpperCase();

  return (
    <>
      <Link
        to="/pokedex/generation"
        state={{
          source: props.data.url,
          title: `Browsing ${name}`,
          id: props.data.name,
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
    </>
  );
}
