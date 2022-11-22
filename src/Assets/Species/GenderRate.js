import { useState, useEffect } from "react";

export default function GenderRate(props) {
  const [gender, setGender] = useState();
  const [genderBar, setGenderBar] = useState({
    female: { width: "0px" },
    male: { width: "0px" },
    genderless: { width: "0px" },
  });

  function processGender() {
    switch (props.data) {
      case -1:
        setGenderBar({ ...genderBar, genderless: { width: "160px" } });
        return "Genderless";
      case 0:
        setGenderBar({
          ...genderBar,
          male: { width: "160px", borderRadius: "10px 10px 10px 10px" },
        });
        return "Male only";
      case 1:
        setGenderBar({
          ...genderBar,
          female: { width: "20px" },
          male: { width: "140px" },
        });
        return "12.5% Female : 87.5% Male";
      case 2:
        setGenderBar({
          ...genderBar,
          female: { width: "40px" },
          male: { width: "120px" },
        });
        return "25% Female : 75% Male";
      case 3:
        return "Error";
      case 4:
        setGenderBar({
          ...genderBar,
          female: { width: "80px" },
          male: { width: "80px" },
        });
        return "50% Female : 50% Male";
      case 5:
        return "Error";
      case 6:
        setGenderBar({
          ...genderBar,
          female: { width: "40px" },
          male: { width: "120px" },
        });
        return "75% Female : 25% Male";
      case 7:
        setGenderBar({
          ...genderBar,
          female: { width: "140px" },
          male: { width: "20px" },
        });
        return "87.5% Female : 12.5% Male";
      case 8:
        setGenderBar({
          ...genderBar,
          male: { width: "160px", borderRadius: "10px 10px 10px 10px" },
        });
        return "Female only";
      default:
        return "Error";
    }
  }

  useEffect(
    () => {
      setGender(processGender());
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      Gender Ratio
      <div className="genderRatioContainer">
        <div className="female" style={genderBar.female} />
        <div className="male" style={genderBar.male} />
        <div className="genderless" style={genderBar.genderless} />
      </div>
      {gender}
    </div>
  );
}
