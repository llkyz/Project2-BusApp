import { useState, useEffect } from "react";

export default function Genus(props) {
  const [genus, setGenus] = useState("");

  useEffect(() => {
    let found = props.data.filter((data) => data.language.name === "en");
    if (found[0] === undefined) {
      setGenus("Unknown");
    } else {
      setGenus(found[0].genus);
    }
  }, [props.data]);

  return <p>{genus}</p>;
}
