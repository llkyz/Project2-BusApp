import React, { useState, useEffect } from "react";
import regionImg from "../Assets/Regions/regionImg";
import { Link, useParams } from "react-router-dom";
import Location from "./Location";
import { cleanTitle } from "../Assets/cleanup";
import { LoadingImgLarge } from "../Assets/cleanup";
import config from "../config";
import SearchBarLocation from "./SearchBarLocation";
import { sortNameAsc, checkAgainstSearchLocation } from "../Assets/sortPokemon";
import Favourites from "./Favourites";

export default function Region() {
  const params = useParams();
  const [regionData, setRegionData] = useState();
  const [location, setLocation] = useState();
  const [searchBar, setSearchBar] = useState({
    searchQuery: "",
    sortQuery: "",
  });

  useEffect(() => {
    const getRegion = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_REGION + params.id
      );
      let data = await response.json();
      data.locations = sortNameAsc(data.locations);
      setRegionData(data);
    };

    getRegion();
    // eslint-disable-next-line
  }, [params]);

  function ListLocations(props) {
    function doListing(myList) {
      return myList.map((data, index) => {
        return (
          <div
            key={index}
            className="locationEntry"
            onClick={() => setLocation(data.url)}
          >
            {cleanTitle(data.name)}
          </div>
        );
      });
    }
    if (props.searchCheck) {
      let myList = regionData.locations.filter((data) =>
        checkAgainstSearchLocation(data.name, searchBar.searchQuery)
      );
      return doListing(myList);
    } else {
      return doListing(regionData.locations);
    }
  }

  function GenerationLink() {
    return (
      <Link
        to="/pokedex/generation"
        state={{
          source: regionData.main_generation.url,
          title:
            "Browsing Generation " +
            regionData.main_generation.name.split("-")[1].toUpperCase(),
          id: regionData.main_generation.name,
        }}
      >
        <h2>
          {regionData.main_generation.name.replace("-", " ").toUpperCase()}
        </h2>
      </Link>
    );
  }

  // function DisplayRegion() {
  //   return (
  //     <div className="region">
  //       <div className="regionHeader">
  //         <h1>{regionData.name.toUpperCase()}</h1>
  //         {regionData.main_generation ? (
  //           <GenerationLink />
  //         ) : (
  //           <h2>NO GENERATION</h2>
  //         )}
  //       </div>
  //       <img
  //         className="regionImg"
  //         src={regionImg[regionData.name]}
  //         alt={regionData.name}
  //       />
  //       {regionData.locations.length !== 0 ? (
  //         <>
  //           <h1>Locations</h1>
  //           <div className="locationList">
  //             {location ? (
  //               <Location data={location} reset={setLocation} />
  //             ) : (
  //               <>
  //                 <SearchBarLocation
  //                   setSearchBar={setSearchBar}
  //                   searchBar={searchBar}
  //                   setRegionData={setRegionData}
  //                   regionData={regionData}
  //                 />
  //                 <div>
  //                   {searchBar.searchQuery ? (
  //                     <ListLocations searchCheck={true} />
  //                   ) : (
  //                     <ListLocations searchCheck={false} />
  //                   )}
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </>
  //       ) : (
  //         <h1>No Locations Found</h1>
  //       )}
  //     </div>
  //   );
  // }

  // return <div>{regionData ? <DisplayRegion /> : <LoadingImgLarge />}</div>;

  return (
    <>
      <Favourites />
      <div className="region">
        {regionData ? (
          <>
            <div className="regionHeader">
              <h1>{regionData.name.toUpperCase()}</h1>
              {regionData.main_generation ? (
                <GenerationLink />
              ) : (
                <h2>NO GENERATION</h2>
              )}
            </div>
            <img
              className="regionImg"
              src={regionImg[regionData.name]}
              alt={regionData.name}
            />
          </>
        ) : (
          <LoadingImgLarge />
        )}
        <h1>Locations</h1>
        <div className="locationList">
          <SearchBarLocation
            setSearchBar={setSearchBar}
            searchBar={searchBar}
            setRegionData={setRegionData}
            regionData={regionData}
          />
          {regionData ? (
            <>
              {regionData.locations.length !== 0 ? (
                <>
                  {location ? (
                    <Location data={location} reset={setLocation} />
                  ) : (
                    <>
                      <div>
                        {searchBar.searchQuery ? (
                          <ListLocations searchCheck={true} />
                        ) : (
                          <ListLocations searchCheck={false} />
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <h1>No Locations Found</h1>
              )}
            </>
          ) : (
            <LoadingImgLarge />
          )}
        </div>
      </div>
    </>
  );
}
