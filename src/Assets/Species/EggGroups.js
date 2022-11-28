import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EggGroups(props) {
  const [group, setGroup] = useState();

  useEffect(() => {
    setGroup(ProcessGroups());
    // eslint-disable-next-line
  }, []);

  function ProcessGroups() {
    return props.data.map((data, index) => {
      let name = data.name.toUpperCase();

      return (
        <Link
          key={index}
          to={`/pokedex/egg-group/${data.url.split("/").slice(-2, -1)}`}
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
      );
    });
  }

  return <>{group ? <ProcessGroups /> : ""}</>;
}
