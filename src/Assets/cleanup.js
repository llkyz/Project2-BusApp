import PokeballImg from "./Images/Pokeball.png";

export function cleanTitle(title) {
  function makeUpperCase(n, index) {
    if (/\d/.test(n) || n.length < 2) {
      title[index] = n.toUpperCase();
    } else {
      title[index] = n[0].toUpperCase() + n.substring(1, n.length);
    }
  }

  title = title.split("-");
  title.forEach(makeUpperCase);
  title = title.join(" ");

  return title;
}

export function cleanName(name) {
  return name[0].toUpperCase() + name.substring(1, name.length);
}

export function LoadingImg() {
  return <img className="loadingImg" src={PokeballImg} alt="loading" />;
}

export function LoadingImgLarge() {
  return <img className="loadingImgLarge" src={PokeballImg} alt="loading" />;
}
