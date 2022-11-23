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
          to="/pokedex/other"
          state={{
            source: data.url,
            title: `Searching by Egg Group (${name})`,
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
      );
    });
  }

  return <>{group ? <ProcessGroups /> : ""}</>;
}
