import { useEffect } from "react";

export default function Image(props) {
  useEffect(() => {
    props.toggle(true);
  }, [props]);

  return (
    <img
      src={props.source}
      alt={props.alt}
      onError={(event) => (event.target.src = props.error)}
    />
  );
}
