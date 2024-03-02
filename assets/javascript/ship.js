//Ship factory function to build new ships
export function Ship(name, length = 0, hits = 0, shape = null, status = null) {
  //declaring a ships object to store and access properties of the ships
  let ships = {
    name: name,
    length: length,
    hits: hits,
    shape: shape,
    status: status,
  };

  //function hit to increase the hit count of the ship
  function hit() {
    ships.hits += 1;
    isSunk();

    return ships;
  }

  //function to check if the ship is underwater or not.
  function isSunk() {
    if (ships.length === ships.hits) {
      ships.status = "Underwater";
      return ships;
    }

    return ships;
  }

  return { ships, hit, isSunk };
}
