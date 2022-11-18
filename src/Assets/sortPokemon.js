export function createPokeId(myData) {
  let myList = [];
  myList = myData.map((data) => {
    return {
      name:
        data.name[0].toUpperCase() + data.name.substring(1, data.name.length),
      url: data.url,
      pokeid: parseInt(data.url.split("/").slice(-2, -1)),
    };
  });
  return myList;
}

export function sortPokedexAsc(myList) {
  myList.sort((a, b) => {
    let idA = a.pokeid;
    let idB = b.pokeid;
    if (idA < idB) return -1;
    else return 1;
  });
  return myList;
}

export function sortPokedexDsc(myList) {
  myList.sort((a, b) => {
    let idA = a.pokeid;
    let idB = b.pokeid;
    if (idA > idB) return -1;
    else return 1;
  });
  return myList;
}

export function sortNameAsc(myList) {
  myList.sort((a, b) => {
    let idA = a.name.toLowerCase();
    let idB = b.name.toLowerCase();
    if (idA < idB) return -1;
    else return 1;
  });
  return myList;
}

export function sortNameDsc(myList) {
  myList.sort((a, b) => {
    let idA = a.name.toLowerCase();
    let idB = b.name.toLowerCase();
    if (idA > idB) return -1;
    else return 1;
  });
  return myList;
}

export function replaceImage(event) {
  event.target.src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
}

export function checkAgainstSearch(name, id, searchQuery) {
  return (
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    id.toString().includes(searchQuery.toLowerCase())
  );
}
