import { Link } from "react-router-dom";
import { cleanName } from "../cleanup";

export default function Types(props) {
  return (
    <>
      {props.data
        ? props.data.map((data) => {
            let name = data.type.name.toUpperCase();

            return (
              <Link
                to="/pokedex/type"
                state={{
                  source: data.type.url,
                  title: `Searching by Type (${name})`,
                }}
              >
                <p
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  className={`typeColor type${cleanName(data.type.name)}`}
                >
                  {name}
                </p>
              </Link>
            );
          })
        : "No Type"}
    </>
  );
}
