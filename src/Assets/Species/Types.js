import { Link } from "react-router-dom";

export default function Type(props) {

  return (
    <div>
      <p>Type</p>
      {props.data ? (
        props.data.map((data)=>{
            let name =
            data.type.name[0].toUpperCase() +
            data.type.name.substring(1, data.type.name.length);

          return (
          <Link to="/pokedex/type"
          state={{
            source: data.type.url,
            title: `Searching by Type (${name})`,
          }}
        >
          <p>{name}</p>
        </Link>)
        })
      ) : (
        "No Type"
      )}
    </div>
  );
}
