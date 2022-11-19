export function cleanTitle(title) {
  function makeUpperCase(n, index) {
    if (n.length !== 0 && isNaN(n)) {
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
