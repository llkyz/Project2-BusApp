import React, { useState, useEffect } from "react";
import generationSprites from "../generationSprites";
import { cleanName } from "../cleanup";
import { Link } from "react-router-dom";

export function EvolutionChain(props) {
  const [evolutionData, setEvolutionData] = useState("");

  useEffect(() => {
    const getEvolutionData = async () => {
      const response = await fetch(props.data.url);
      let data = await response.json();
      setEvolutionData(data.chain);
    };
    if (props.data === null) {
      setEvolutionData("None");
    } else {
      getEvolutionData();
    }
    // eslint-disable-next-line
  }, []);

  const currentPoke = props.pokeid.toString();

  function ProcessPokemon(props) {
    const pokeid = props.evolData.url.split("/").slice(-2, -1);

    return (
      <>
        {currentPoke === pokeid[0] ? (
          <div className="evolutionNodeSelf">
            <img
              src={generationSprites["full"] + pokeid + ".png"}
              alt={props.evolData.name}
            />
            <p>{cleanName(props.evolData.name)}</p>
          </div>
        ) : (
          <Link to={`/pokemon/${pokeid}`}>
            <div
              className="evolutionNode"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={generationSprites["full"] + pokeid + ".png"}
                alt={props.evolData.name}
              />
              <p>{cleanName(props.evolData.name)}</p>
            </div>
          </Link>
        )}
      </>
    );
  }

  function ProcessEvolutionData() {
    if (evolutionData !== "None") {
      return (
        <div>
          <div className="layer1">
            <ProcessPokemon evolData={evolutionData.species} />
            {evolutionData.evolves_to.length !== 0 ? (
              <>
                <div className="evolutionArrow" />
                {evolutionData.evolves_to.length > 1 ? (
                  <div className="separator" />
                ) : (
                  ""
                )}
                {evolutionData.evolves_to.map((data, index) => {
                  return (
                    <div key={index} className="layer2">
                      <div className="evolutionArrow" />
                      <ProcessPokemon evolData={data.species} />
                      {data.evolves_to.length !== 0 ? (
                        <>
                          <div className="evolutionArrow" />
                          {data.evolves_to.length > 1 ? (
                            <div className="separator" />
                          ) : (
                            ""
                          )}
                          <div />
                          {data.evolves_to.map((data2, index2) => {
                            return (
                              <div key={index2} className="layer3">
                                <div className="evolutionArrow" />
                                <ProcessPokemon evolData={data2.species} />
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>No evolution data available</h3>
        </div>
      );
    }
  }

  return <>{evolutionData ? <ProcessEvolutionData /> : "Loading..."}</>;
}
