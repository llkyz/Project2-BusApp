import { Link } from "react-router-dom";
import { cleanName } from "../cleanup";

export default function Types(props) {
  return (
    <>
      {props.data
        ? props.data.map((data, index) => {
            let name = data.type.name.toUpperCase();

            return (
              <Link
                key={index}
                to={`/pokedex/type/${data.type.url.split("/").slice(-2, -1)}`}
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
