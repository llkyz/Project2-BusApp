import { useState, useEffect } from "react";
import versions from "../versions";
import versionOrder from "../versionOrder";

export default function Encounters(props) {
  const [encounterList, setEncounterList] = useState();
  const [currentVersion, setCurrentVersion] = useState(0);

  function processEncounters(props) {
    let myList = {};
    let newList = [];

    props.forEach((data) => {
      let locationUrl = data.location_area.url;
      let locationName = data.location_area.name.split("-");
      locationName = locationName
        .map((data) => {
          if (/\d/.test(data) || data.length < 2) {
            return data.toUpperCase();
          } else {
            return data[0].toUpperCase() + data.substring(1, data.length);
          }
        })
        .join(" ");

      data.version_details.forEach((data) => {
        if (Object.hasOwn(myList, data.version.name)) {
          myList[data.version.name].push({
            name: locationName,
            url: locationUrl,
          });
        } else {
          myList[data.version.name] = [
            { name: locationName, url: locationUrl },
          ];
        }
      });
    });

    for (let [version, list] of Object.entries(myList)) {
      newList.push([version, list]);
    }

    newList.sort(function (a, b) {
      a = versionOrder.indexOf(a[0]);
      b = versionOrder.indexOf(b[0]);
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    });

    setEncounterList(newList);
  }

  function DisplayEncounters() {
    if (encounterList.length !== 0) {
      return (
        <>
          <div className="encounterVersions">
            {encounterList.map((data, index) => {
              return (
                <div
                  key={index}
                  className={currentVersion === index ? "tabSelected" : "tab"}
                  onClick={() => setCurrentVersion(index)}
                >
                  <div
                    className={`${["version", versions[data[0]].col].join(
                      " "
                    )}`}
                  >
                    {versions[data[0]].letter}
                  </div>
                </div>
              );
            })}
          </div>
          {encounterList[currentVersion][1].map((data) => {
            return <h3 onClick={() => console.log(data.url)}>{data.name}</h3>;
          })}
        </>
      );
    } else {
      return <h3>No encounters available</h3>;
    }
  }

  useEffect(() => {
    const getEncounters = async () => {
      const response = await fetch(props.data);
      const data = await response.json();
      processEncounters(data);
    };
    getEncounters();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="encounter">
      <h1>Encounters</h1>
      {encounterList ? <DisplayEncounters /> : ""}
    </div>
  );
}
