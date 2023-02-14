import React, { useState, useEffect } from "react";
import versions from "../versions";

export default function FlavorText(props) {
  const [entries, setEntries] = useState("");
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    function ProcessEntries() {
      const textList = props.data
        .filter((entry) => entry.language.name === "en")
        .map((entry) => {
          return {
            text: entry.flavor_text
              .replaceAll("\n", "<br>")
              .replaceAll("\f", "<br>"),
            version: entry.version.name,
          };
        });
      setEntries(textList);
    }
    ProcessEntries();
    // eslint-disable-next-line
  }, []);

  function DisplayEntries() {
    return (
      <>
        <div className="flavorVersions">
          {entries.map((data, index) => {
            return (
              <div
                key={index}
                className={currentText === index ? "tabSelected" : "tab"}
                onClick={() => setCurrentText(index)}
              >
                <div
                  className={`${["version", versions[data.version].col].join(
                    " "
                  )} `}
                >
                  {versions[data.version].letter}
                </div>
              </div>
            );
          })}
        </div>
        <h3
          dangerouslySetInnerHTML={{
            __html:
              entries[currentText] === undefined
                ? "No flavor text available"
                : entries[currentText].text,
          }}
        />
      </>
    );
  }

  return (
    <div className="flavor" style={{ marginBottom: "300px" }}>
      <h1>Flavor Text</h1>
      {entries ? <DisplayEntries /> : ""}
    </div>
  );
}
