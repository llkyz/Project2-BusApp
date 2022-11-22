export default function Forms(props) {
  function ProcessForms() {
    return props.data.map((data, index) => {
      let name = ""
      if (data.is_default) {

        name = data.pokemon.name.replace(props.defaultName,"").split("-")
        name = name.map((data)=>data.toUpperCase()).join(" ");
        if (name.length === 0) {
          name = "REGULAR";
        }
      } else {
        name = data.pokemon.name.replace(props.defaultName,"").split("-")
        name = name.map((data)=>data.toUpperCase()).join(" ");
      }

      return (
        <div key={index} className={index === props.formSelected ? "formSelected" : "form"} onClick={()=>{props.setFormSelected(index)}}>{name}</div>
      )
    });
  }

  return (
    <div>
      <ProcessForms />
    </div>
  );
}
