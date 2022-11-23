import Types from "./Types";
import Generation from "./Generation";
import GenderRate from "./GenderRate";
import Genus from "./Genus";
import EggGroups from "./EggGroups";
import Habitat from "./Habitat";
import Shape from "./Shape";
import HatchCounter from "./HatchCounter";
import Color from "./Color";
import Tick from "../Images/tick.svg";
import Cross from "../Images/cross.svg";

export default function AttrTable(props) {
  let pokemonData = props.pokemonData;
  let speciesData = props.speciesData;

  return (
    <div className="attrTableContainer">
      <h1>Attributes</h1>
      <table className="attrTable">
        <tr>
          <th>
            <p>TYPE</p>
          </th>
          <th>
            <p>POKÉDEX</p>
          </th>
          <th>
            <p>ORIGIN</p>
          </th>
          <th>
            <p>COLOR</p>
          </th>
        </tr>
        <tr>
          <td>
            <Types data={pokemonData.types} />
          </td>
          <td>
            <h4>#{speciesData.id}</h4>
          </td>
          <td>
            <Generation data={speciesData.generation} />
          </td>
          <td>
            <Color data={speciesData.color} />
          </td>
        </tr>
        <tr>
          <th>
            <p>GENDER RATIO</p>
          </th>
          <th>
            <p>HEIGHT</p>
          </th>
          <th>
            <p>WEIGHT</p>
          </th>
          <th>
            <p>GROWTH</p>
          </th>
        </tr>
        <tr>
          <td>
            <GenderRate data={speciesData.gender_rate} />
          </td>
          <td>
            <p>{(pokemonData.height / 10).toFixed(1)} m</p>
          </td>
          <td>
            <p>{(pokemonData.weight / 10).toFixed(1)} kg</p>
          </td>
          <td>
            {speciesData.growth_rate.name
              .split("-")
              .map(
                (speed) =>
                  speed[0].toUpperCase() + speed.substring(1, speed.length)
              )
              .join(" - ")}
          </td>
        </tr>
        <tr>
          <th>
            <p>GENUS</p>
          </th>
          <th>
            <p>EGG GROUP</p>
          </th>
          <th>
            <p>HABITAT</p>
          </th>
          <th>
            <p>SHAPE</p>
          </th>
        </tr>
        <tr>
          <td>
            <Genus data={speciesData.genera} />
          </td>
          <td>
            <EggGroups data={speciesData.egg_groups} />
          </td>
          <td>
            <Habitat data={speciesData.habitat} />
          </td>
          <td>
            <Shape data={speciesData.shape} />
          </td>
        </tr>
        <tr>
          <th>
            <p>EGG HATCHING</p>
          </th>
          <th>
            <p>BABY</p>
          </th>
          <th>
            <p>LEGENDARY</p>
          </th>
          <th>
            <p>MYTHICAL</p>
          </th>
        </tr>
        <tr>
          <td>
            <HatchCounter data={speciesData.hatch_counter} />
          </td>
          <td>
            {speciesData.is_baby ? (
              <img className="checkbox" src={Tick} alt="tick" />
            ) : (
              <img className="checkbox" src={Cross} alt="cross" />
            )}
          </td>
          <td>
            {speciesData.is_legendary ? (
              <img className="checkbox" src={Tick} alt="tick" />
            ) : (
              <img className="checkbox" src={Cross} alt="cross" />
            )}
          </td>
          <td>
            {speciesData.is_mythical ? (
              <img className="checkbox" src={Tick} alt="tick" />
            ) : (
              <img className="checkbox" src={Cross} alt="cross" />
            )}
          </td>
        </tr>
      </table>
      <div className="attrTableEnd"></div>
    </div>
  );
}
