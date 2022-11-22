import { useState, useEffect } from "react";

export default function Forms(props) {
  const [formData, setFormData] = useState();
  const [formSelected, setFormSelected] = useState();

  //   useEffect(() => {
  //     processForms();
  //     // eslint-disable-next-line
  //   }, []);

  async function getPokemonData(url) {
    const response = await fetch(url);
    let data = await response.json();
    props.setPokemonData(data);
  }

  function ProcessForms() {
    return props.data.map((data, index) => {
      let name = "";

      if (data.is_default) {
        setFormSelected(index);
        getPokemonData(data.pokemon.url);
        name = "REGULAR";
      } else {
        name = data.pokemon.name.split("-")[1].toUpperCase();
      }
      console.log(name);
      return (
        <div
          className={index === formSelected ? "formSelected" : "form"}
          onClick={setFormSelected(index)}
        >
          {name}
        </div>
      );
    });
  }

  return (
    <div>
      <ProcessForms />
    </div>
  );
}
