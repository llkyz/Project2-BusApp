export default function HatchCounter(props) {
  let result = "";

  if (props.data === null) {
    result = "Unavailable";
  } else {
    result = `~${props.data * 256} steps`;
  }

  return <div>Egg Hatching: {result}</div>;
}
