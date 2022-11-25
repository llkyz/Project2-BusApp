import { useState, useEffect } from "react";

export default function Star(props) {
  const [favourite, setFavourite] = useState(false);
  const [newFavourite, setNewFavourite] = useState(false);

  useEffect(() => {
    function checkFav() {
      if (props.favourites.findIndex((x) => x.id === props.pokeid) !== -1) {
        setFavourite(true);
      } else {
        setFavourite(false);
        setNewFavourite(false);
      }
    }
    checkFav();
  }, [props.favourites, props.pokeid]);

  function toggleFavourite() {
    let newfavList = null;
    if (favourite) {
      newfavList = props.favourites.filter((data) => data.id !== props.pokeid);
      setFavourite(false);
    } else {
      newfavList = [
        ...props.favourites,
        { id: props.pokeid, name: props.name },
      ];
      setNewFavourite(true);
    }

    localStorage.setItem("favourites", JSON.stringify(newfavList));
    props.setFavourites(newfavList);
  }

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <div
        className="starStreak"
        style={
          newFavourite
            ? { animation: "streak1 0.5s linear", animationIterationCount: "1" }
            : {}
        }
      />
      <div
        className="starStreak"
        style={
          newFavourite
            ? { animation: "streak2 0.5s linear", animationIterationCount: "1" }
            : {}
        }
      />
      <div
        className="starStreak"
        style={
          newFavourite
            ? { animation: "streak3 0.5s linear", animationIterationCount: "1" }
            : {}
        }
      />
      <div
        className="starStreak"
        style={
          newFavourite
            ? { animation: "streak4 0.5s linear", animationIterationCount: "1" }
            : {}
        }
      />
      <div
        className="starStreak"
        style={
          newFavourite
            ? { animation: "streak5 0.5s linear", animationIterationCount: "1" }
            : {}
        }
      />
      <div
        onClick={toggleFavourite}
        className="pokemonStar"
        style={
          newFavourite
            ? {
                animation: "pulseFast 0.2s linear",
                animationIterationCount: "1",
              }
            : {}
        }
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="40"
          viewBox="-2,-2,46,44"
          fill={favourite ? "rgb(245, 183, 0)" : "none"}
          stroke={favourite ? "rgb(245, 183, 0)" : "rgb(202, 154, 75)"}
          strokeWidth="4px"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
        >
          <g transform="translate(-218.96759,-158.9)">
            <g data-paper-data='{"isPaintingLayer":true}'>
              <path d="M260.2,176.7l-8.2,8l1.8,11.3c0.2,1 -0.2,2 -1,2.6c-0.4,0.3 -1,0.5 -1.5,0.5c-0.4,0 -0.8,-0.1 -1.2,-0.3l-10.1,-5.3l-10.2,5.3c-0.4,0.2 -0.8,0.3 -1.2,0.3c-0.5,0 -1,-0.2 -1.5,-0.5c-0.8,-0.6 -1.2,-1.6 -1,-2.6l1.9,-11.2l-8.2,-8c-0.8,-0.7 -1,-1.7 -0.7,-2.7c0.3,-1 1.1,-1.7 2.1,-1.8l11.3,-1.6l5.1,-10.3c0.5,-0.9 1.4,-1.5 2.4,-1.5c1,0 2,0.6 2.4,1.5l5.1,10.3l11.3,1.6c1,0.2 1.8,0.8 2.1,1.8c0.3,0.9 0,2 -0.7,2.6z" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
