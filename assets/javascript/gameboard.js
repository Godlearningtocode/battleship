//GameBoard factory function for creating the grid, placing ships, attacking the grid and then game report for if a winner is decided.
export function GameBoard(x, y) {
  //declaring varibales
  let grid = [];
  let shipCoordinates = [];
  let battleshipCount = [];
  let missCoordinates = [];
  let sunkenShips = [];

  //function makeBoard to push the coordinates to the grid array
  function makeBoard() {
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        grid.push([j, i]);
      }
    }
    return grid;
  }

  //function to place ships at the x and y coordinates
  function placeShipAt(x, y, battleship) {
    if(battleshipCount.length === 1) {
      if(y > 6) return false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == y)) > -1) return false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == Number(y) + 1)) > -1) return false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == Number(y) + 2)) > -1) return false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == Number(y) + 3)) > -1) return false
    } else if(battleshipCount.length === 2) {
      if(y > 7) false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == Number(y))) > -1) return false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == Number(y) + 1)) > -1) return false
      if((shipCoordinates.findIndex((element) => element[0] == x && element[1] == Number(y) + 2)) > -1) return false
    } else if(battleshipCount.length === 3) {
      if(x > 8) return false
      if((shipCoordinates.findIndex((element) => element[0] == Number(x) && element[1] == Number(y))) > -1) return false
      if((shipCoordinates.findIndex((element) => element[0] == Number(x) + 1 && element[1] == Number(y))) > -1) return false
    }

    let firstCoordinateIndex = grid.findIndex(
      (element) => element[0] == x && element[1] == y,
    );
    grid[firstCoordinateIndex].push(battleship.ships.name);
    shipCoordinates.push(grid[firstCoordinateIndex]);
    if (battleshipCount.includes(battleship) == false)
      battleshipCount.push(battleship.ships);

    if (battleship.ships.shape == "horizontal") {
      for (let i = 1; i < battleship.ships.length; i++) {
        let nextCoordinate = grid.findIndex(
          (element) => element[0] == Number(x) + i && element[1] == y,
        );
        grid[nextCoordinate].push(battleship.ships.name);
        shipCoordinates.push(grid[nextCoordinate]);
      }
    } else if (battleship.ships.shape == "vertical") {
      for (let i = 1; i < battleship.ships.length; i++) {
        let nextCoordinate = grid.findIndex(
          (element) => element[0] == x && element[1] == Number(y) + i,
        );
        grid[nextCoordinate].push(battleship.ships.name);
        shipCoordinates.push(grid[nextCoordinate]);
      }
    }

    return true;
  }

  //function to attack the enemey ship at x and y coordinates
  function recieveAttack(x, y, battleship) {
    if (
      shipCoordinates.findIndex(
        (element) => element[0] == x && element[1] == y,
      ) > -1
    ) {
      battleship.ships.hits += 1;
      battleship.isSunk();
      if (
        battleship.ships.status === "Underwater" &&
        sunkenShips.includes(battleship) == false
      ) {
        sunkenShips.push(battleship.ships);
      }
      return battleship.ships.hits;
    } else {
      missCoordinates.push(
        grid[grid.findIndex((element) => element[0] == x && element[1] == y)],
      );
      return {
        missCoordinates,
        shipCoordinates,
      };
    }
  }

  //function to check if the game is over and if a winner is decided or not
  function gameReport() {
    if (battleshipCount.length === sunkenShips.length) return true;

    return false;
  }

  return {
    makeBoard,
    placeShipAt,
    recieveAttack,
    missCoordinates,
    gameReport,
    battleshipCount,
    shipCoordinates,
    grid,
    sunkenShips
  };
}
