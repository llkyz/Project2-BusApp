import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FavouriteList } from "../App";
import generationSprites from "../Assets/generationSprites";

export default function Favourites() {
  const favList = useContext(FavouriteList);
  const [lightUp, setLightUp] = useState();
  const [showList, setShowList] = useState(false);

  function FavouriteEntry(props) {
    return (
      <div className="favouriteEntry">
        <div className="id">#{props.data.id}</div>
        <Link to={`/pokemon/${props.data.id}`}>
          <div className="name">{props.data.name}</div>
        </Link>
        <img
          src={generationSprites["full"] + props.data.id + ".png"}
          alt={props.data.name}
        />
        <div className="remove" onClick={() => removeFavourite(props.data.id)}>
          x
        </div>
      </div>
    );
  }

  function removeFavourite(id) {
    const newfavList = favList.favourites.filter((data) => data.id !== id);
    localStorage.setItem("favourites", JSON.stringify(newfavList));
    favList.setFavourites(newfavList);
  }

  function DisplayList() {
    return (
      <div className="favouriteList">
        {favList.favourites.length === 0 ? (
          <h4>No favourites saved</h4>
        ) : (
          <>
            {favList.favourites.map((data, index) => {
              return <FavouriteEntry key={index} data={data} />;
            })}
          </>
        )}
      </div>
    );
  }

  useEffect(() => {
    function checkFavourites() {
      if (favList.favourites.length > 0) {
        setLightUp(true);
      } else {
        setLightUp(false);
      }
    }
    checkFavourites();
  }, [favList]);

  function toggleShow() {
    if (showList) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  }

  return (
    <div className="favourites">
      <div className="starContainer">
        <div className="star">
          <svg
            onClick={toggleShow}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="50"
            viewBox="-2,-2,46,44"
            fill={lightUp ? "rgb(245, 183, 0)" : "none"}
            stroke={lightUp ? "rgb(245, 183, 0)" : "rgb(202, 154, 75)"}
            strokeWidth="4px"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            cursor="pointer"
            style={{ paddingBottom: "1px" }}
          >
            <g transform="translate(-218.96759,-158.9)">
              <g data-paper-data='{"isPaintingLayer":true}'>
                <path d="M260.2,176.7l-8.2,8l1.8,11.3c0.2,1 -0.2,2 -1,2.6c-0.4,0.3 -1,0.5 -1.5,0.5c-0.4,0 -0.8,-0.1 -1.2,-0.3l-10.1,-5.3l-10.2,5.3c-0.4,0.2 -0.8,0.3 -1.2,0.3c-0.5,0 -1,-0.2 -1.5,-0.5c-0.8,-0.6 -1.2,-1.6 -1,-2.6l1.9,-11.2l-8.2,-8c-0.8,-0.7 -1,-1.7 -0.7,-2.7c0.3,-1 1.1,-1.7 2.1,-1.8l11.3,-1.6l5.1,-10.3c0.5,-0.9 1.4,-1.5 2.4,-1.5c1,0 2,0.6 2.4,1.5l5.1,10.3l11.3,1.6c1,0.2 1.8,0.8 2.1,1.8c0.3,0.9 0,2 -0.7,2.6z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      {showList ? <DisplayList /> : ""}
    </div>
  );
}
