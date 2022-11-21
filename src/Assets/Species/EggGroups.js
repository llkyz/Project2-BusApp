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
      let name =
        data.name[0].toUpperCase() + data.name.substring(1, data.name.length);

      return (
        <Link
          key={index}
          to="/pokedex/other"
          state={{ source: data.url, title: `Browsing Egg Group (${name})` }}
        >
          <p>{name}</p>
        </Link>
      );
    });
  }

  return (
    <div>
      {group ? (
        <>
          <p>Egg Groups</p>
          <ProcessGroups />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
