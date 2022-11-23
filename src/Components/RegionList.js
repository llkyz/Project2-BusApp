import React, { useEffect, useContext } from "react";
import config from "../config";
import regionImg from "../Assets/Regions/regionImg";
import Region from "./Region";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import { Navigation } from "../App";
import { LoadingImgLarge } from "../Assets/cleanup";

export default function RegionList() {
  const nav = useContext(Navigation);

  useEffect(() => {
    const getRegionList = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_REGION
      );
      let data = await response.json();
      nav.set({ regionList: data.results });
    };
    getRegionList();
    // eslint-disable-next-line
  }, []);

  function ListRegions() {
    return nav.data.regionList.map((data, index) => (
      <div
        onClick={() => nav.set({ region: data.url })}
        className="regionContainer"
        id={
          "region" +
          data.url.substring(data.url.length - 2, data.url.length - 1)
        }
        key={index}
      >
        <h1>{data.name.toUpperCase()}</h1>
        <div className="imageContainer">
          <img src={regionImg[data.name]} alt={data.name} />
        </div>
      </div>
    ));
  }

  return (
    <>
      {nav.data.regionList ? (
        nav.data.region ? (
          <Region />
        ) : (
          <>
            <h1>
              <u>Search by Region</u>
            </h1>
            <Link to="/">
              <BackButton back={"fromRegionList"} />
            </Link>
            <div className="regionList">
              <ListRegions />
            </div>
          </>
        )
      ) : (
        <LoadingImgLarge />
      )}
    </>
  );
}
