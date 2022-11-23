import { useState, useEffect } from "react";
import moveVersions from "../moveVersions";
import moveVersionOrder from "../moveVersionOrder";
import { cleanTitle } from "../cleanup";
import MoveEntry from "./MoveEntry";

export default function Moves(props) {
  const [moveList, setMoveList] = useState();
  const [currentVersion, setCurrentVersion] = useState(0);

  function processMoves(props) {
    let myList = {};
    let newList = [];

    props.forEach((data) => {
      let moveUrl = data.move.url;
      let moveName = data.move.name.split("-");
      moveName = moveName
        .map((data) => {
          if (/\d/.test(data) || data.length < 2) {
            return data.toUpperCase();
          } else {
            return data[0].toUpperCase() + data.substring(1, data.length);
          }
        })
        .join(" ");
      data.version_group_details.forEach((data) => {
        if (Object.hasOwn(myList, data.version_group.name)) {
          myList[data.version_group.name].push({
            name: moveName,
            url: moveUrl,
            level: data.level_learned_at,
            method: cleanTitle(data.move_learn_method.name),
          });
        } else {
          myList[data.version_group.name] = [
            {
              name: moveName,
              url: moveUrl,
              level: data.level_learned_at,
              method: cleanTitle(data.move_learn_method.name),
            },
          ];
        }
      });
    });

    for (let [version, list] of Object.entries(myList)) {
      newList.push([version, list]);
    }

    newList.sort(function (a, b) {
      a = moveVersionOrder.indexOf(a[0]);
      b = moveVersionOrder.indexOf(b[0]);
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    });

    newList.map((data) => {
      return data[1].sort(function (a, b) {
        // a = a.level;
        // b = b.level;
        if (a.level > b.level) {
          return 1;
        } else if (a.level < b.level) {
          return -1;
        } else if (a.method > b.method) {
          return 1;
        } else if (a.method < b.method) {
          return -1;
        } else {
          return 0;
        }
      });
    });
    setMoveList(newList);
  }

  function DisplayMoves() {
    if (moveList.length !== 0) {
      return (
        <>
          <div className="moveVersions">
            {moveList.map((data, index) => {
              return (
                <div
                  key={index}
                  className={currentVersion === index ? "tabSelected" : "tab"}
                  onClick={() => setCurrentVersion(index)}
                >
                  <div
                    className={`${["version", moveVersions[data[0]].col].join(
                      " "
                    )}`}
                  >
                    {moveVersions[data[0]].letter}
                  </div>
                </div>
              );
            })}
          </div>
          <table className="moveTable">
            <tbody>
              <tr bgcolor="rgb(255, 243, 224)">
                <th className="sticky">
                  <h2>Move</h2>
                </th>
                <th className="sticky">
                  <h2>Level</h2>
                </th>
                <th className="sticky">
                  <h2>Source</h2>
                </th>
              </tr>
              {moveList[currentVersion][1].map((data, index) => {
                return <MoveEntry key={index} data={data} />;
              })}
            </tbody>
          </table>
        </>
      );
    } else {
      return <h3>No moves available</h3>;
    }
  }

  useEffect(() => {
    const getMoves = async () => {
      processMoves(props.data);
    };
    getMoves();
    // eslint-disable-next-line
  }, [props]);

  return (
    <div className="moves">
      <h1>Moves</h1>
      {moveList ? <DisplayMoves /> : ""}
    </div>
  );
}
