//Importing assets
import "/assets/css/styles.css";
import { Ship } from "./ship";
import { GameBoard } from "./gameboard";
import { player } from "./player";
import { activePlayer } from "./player";

//Assigning variables and constants for gameboard and ships while also placeing the ships
const playerShip1 = new Ship("playerShip1", 4, 0, "horizontal", "abovewater");
const playerShip2 = new Ship("playerShip2", 4, 0, "vertical", "abovewater");
const playerShip3 = new Ship("playerShip3", 3, 0, "vertical", "abovewater");
const playerShip4 = new Ship("playerShip4", 2, 0, "horizontal", "abovewater");
const computerShip1 = new Ship(
  "computerShip1",
  4,
  0,
  "horizontal",
  "abovewater",
);
const computerShip2 = new Ship(
  "computerShip2",
  4,
  0,
  "vertical",
  "abovewater",
);
const computerShip3 = new Ship("computerShip3", 3, 0, "vertical", "abovewater");
const computerShip4 = new Ship("computerShip4", 2, 0, "horizontal", "abovewater");
let playerBoard = new GameBoard(10, 10);
let computerBoard = new GameBoard(10, 10);
playerBoard.makeBoard();
computerBoard.makeBoard();
let playerGrid = [];
let playerShipsArray = [playerShip1, playerShip2, playerShip3, playerShip4];
let computerShipArray = [
  computerShip1,
  computerShip2,
  computerShip3,
  computerShip4,
];
let xCoordinateArrayPlayer = [];
let yCoordinateArrayPlayer = [];
const playerSection = document.querySelector("#playerSection");
const computerSection = document.querySelector("#computerSection");
const instructionHeading = document.querySelector("#instructionHeading");
let playerShipsPlaced = 0;
let newGameButton = document.querySelector("#newGameButton");
let activePlayerBattleship = document.querySelector('#activePlayerBattleship');
let activeComputerBattleship = document.querySelector('#activeComputerBattleship')

//DOM manipulation
instructionHeading.innerHTML = "players's turn";

//Event Listeners:-
// click event listener for the new game button to restart the board.
newGameButton.addEventListener("click", () => {
  location.reload();
});

//DOMContentLoaded event listener for when the webpage is loaded
window.addEventListener("DOMContentLoaded", () => {
  computerPlacedShip1()
  computerPlacedShip2()
  computerPlacedShip3()
  computerPlacedShip4()
  populatePlayerBoard();
  populateComputerBoard();
  shufflePlayerGrid(playerGrid);
  playerBattleshipUpdate();
  computerBattleshipUpdate();
  instructionHeading.textContent = "Please place your first ship horizotally!";
});

//click event listener to run when the player clicks on one of his cells to place the ship
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("player") == true) {
    let x = event.target.dataset.x;
    let y = event.target.dataset.y;
    let cell = event.target;
    if(preventingOverlap(event) == true) placePlayerShips(x, y, cell)
    else return instructionHeading.textContent = "Can't place the ship in this cell"
  }
});

//Click event listener for when the player clicks on the computer game board
window.addEventListener("click", (event) => {
  if (playerBoard.shipCoordinates.length === 13) {
    let cell = event.target;
    let computerBattleship =
      computerShipArray[
        computerShipArray.findIndex(
          (element) => element.ships.name == cell.dataset.battleship,
        )
      ];
    if (
      cell.classList.contains("shipCell") &&
      cell.classList.contains("computer") &&
      activePlayer == 0
    ) {
      player(
        cell.dataset.x,
        cell.dataset.y,
        playerBoard,
        computerBoard,
        computerBattleship,
      );
      cell.classList.add("shipHit");
      cell.classList.remove("computer");

      instructionHeading.textContent = "Computer's turn";

      if (computerBoard.gameReport() == true) {
        document.body.style = "pointer-events: none";
        return (instructionHeading.innerHTML = "Player has won the game!");
      }

      setTimeout(() => {
        computerTurn(activePlayer);
      }, 1000);
    } else if (
      cell.classList.contains("cell") &&
      cell.classList.contains("computer") &&
      !cell.classList.contains("shipHit") &&
      activePlayer == 0
    ) {
      player(
        cell.dataset.x,
        cell.dataset.y,
        playerBoard,
        computerBoard,
        computerBattleship,
      );
      cell.classList.add("missHit");
      cell.classList.remove("computer");

      instructionHeading.textContent = "Computer's turn";

      if (computerBoard.gameReport() == true) {
        document.body.style = "pointer-events: none";
        return (instructionHeading.innerHTML = "Player has won the game!");
      }

      setTimeout(() => {
        computerTurn(activePlayer);
      }, 1000);
    }
  }

  playerBattleshipUpdate();
  computerBattleshipUpdate();
});

//Functions:-
//Function for populating player gameboard
function populatePlayerBoard() {
  for (let i = 0; i < playerBoard.grid.length; i++) {
    const cell = document.createElement("div");
    const x = playerBoard.grid[i][0];
    const y = playerBoard.grid[i][1];
    const battleship = playerBoard.grid[i][2];
    playerGrid.push([x, y]);
    xCoordinateArrayPlayer.push(x);
    yCoordinateArrayPlayer.push(y);
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.dataset.battleship = battleship;
    cell.classList.add("cell");
    cell.classList.add("player");
    cell.id = `${cell.dataset.x}${cell.dataset.y}`;
    playerSection.appendChild(cell);
  }
}

//Function for populating computer board
function populateComputerBoard() {
  for (let i = 0; i < computerBoard.grid.length; i++) {
    const cell = document.createElement("div");
    const x = computerBoard.grid[i][0];
    const y = computerBoard.grid[i][1];
    const ship = computerBoard.grid[i][2];
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.dataset.battleship = ship;
    if (computerBoard.grid[i].length > 2) cell.classList.add("shipCell");
    cell.classList.add("cell");
    cell.classList.add("computer");
    computerSection.appendChild(cell);
  }
}

//Function to shiffle the playerGrid coordinates so it picks a unique number and then removes it from the array to avoid repitation
function shufflePlayerGrid(playerGrid) {
  let m = playerGrid.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = playerGrid[m];
    playerGrid[m] = playerGrid[i];
    playerGrid[i] = t;
  }

  return playerGrid;
}

//Function for computer turn running after 1000ms when the click event for the player turn is triggered
function computerTurn(activePlayer) {
  const computerAttackCoordinates = playerGrid.pop();
  const computerAttackCoordinatesX = computerAttackCoordinates[0];
  const computerAttackCoordinatesY = computerAttackCoordinates[1];
  let battleshipName = null;
  let playerBattleship;
  let playerCellList = document.querySelectorAll(".player");
  let playerCell;

  for (let i = 0; i < playerBoard.shipCoordinates.length; i++) {
    if (
      playerBoard.shipCoordinates[i][0] == computerAttackCoordinatesX &&
      playerBoard.shipCoordinates[i][1] == computerAttackCoordinatesY
    )
      battleshipName = playerBoard.shipCoordinates[i][2];
  }

  if (battleshipName != null) {
    playerBattleship =
      playerShipsArray[
        playerShipsArray.findIndex(
          (element) => element.ships.name === battleshipName,
        )
      ];
  }

  for (let i = 0; i < playerCellList.length; i++) {
    if (
      playerCellList[i].dataset.x == computerAttackCoordinatesX &&
      playerCellList[i].dataset.y == computerAttackCoordinatesY
    ) {
      playerCell = playerCellList[i];
    }
  }

  if (
    playerCell.classList.contains("player") &&
    playerCell.classList.contains("shipCell") &&
    activePlayer == 1
  ) {
    playerCell.classList.add("shipHit");
    player(
      computerAttackCoordinatesX,
      computerAttackCoordinatesY,
      playerBoard,
      computerBoard,
      playerBattleship,
    );
    playerCell.classList.remove("player");
  } else if (
    playerCell.classList.contains("cell") &&
    playerCell.classList.contains("player") &&
    !playerCell.classList.contains("shipHit") &&
    activePlayer == 1
  ) {
    playerCell.classList.add("missHit");
    player(
      computerAttackCoordinatesX,
      computerAttackCoordinatesY,
      playerBoard,
      computerBoard,
      playerBattleship,
    );
    playerCell.classList.remove("player");
  }

  instructionHeading.textContent = "Player's turn";

  if (playerBoard.gameReport() == true) {
    document.body.style = "pointer-events: none";
    return (instructionHeading.textContent = "Computer has won the game.");
  }
}

//function to place player ships on player Board
function placePlayerShips(x, y, cell) {
  if (playerShipsPlaced === 0 && x < 7) {
    playerBoard.placeShipAt(x, y, playerShip1);
    playerShipsPlaced++;
    cell.classList.add("shipCell");
    addClass();
    return (instructionHeading.textContent =
      "Please place your second ship vertically");
  } else if (playerShipsPlaced === 1 && y < 7) {
    playerBoard.placeShipAt(x, y, playerShip2);
    playerShipsPlaced++;
    cell.classList.add("shipCell");
    addClass();
    return (instructionHeading.textContent =
      "Please place your third ship vertically");
  } else if (playerShipsPlaced === 2 && y < 8) {
    playerBoard.placeShipAt(x, y, playerShip3);
    playerShipsPlaced++;
    cell.classList.add("shipCell");
    addClass();
    return (instructionHeading.textContent =
      "Please place your fourth ship horizontally");
  } else if (playerShipsPlaced === 3 && x < 9) {
    playerBoard.placeShipAt(x, y, playerShip4);
    playerShipsPlaced++;
    cell.classList.add("shipCell");
    addClass();
    return (instructionHeading.textContent =
      "All Ships have been placed, Player's turn to attack.");
  }
  if(playerBoard.battleshipCount.length === 3) return instructionHeading.textContent = "Player has already placed all of the ships. Player's turn to attack."
  
  return instructionHeading.textContent = "Can't place the ship in this cell"
}

//Function to add shipCell classlist once all the ships have been placed
function addClass() {
  if (playerBoard.battleshipCount.length > 0) {
    let playerCell = document.querySelectorAll(".player");
    for (let i = 0; i < playerCell.length; i++) {
      let x = playerCell[i].dataset.x;
      let y = playerCell[i].dataset.y;
      if (
        playerBoard.shipCoordinates.findIndex(
          (element) => element[0] == x && element[1] == y,
        ) > -1
      ) {
        playerCell[i].classList.add("shipCell");
        playerCell[i].classList.add("shipColor");
      }
    }
  }
}

//fixing bugs
function removeBattleshipHover() {
  let cells = document.querySelectorAll('.battleshipHover');
  cells.forEach((element) => {
    element.classList.remove('battleshipHover')
  })
}

function addBattleshipHover (event) {
  let allPlayerCell = document.querySelectorAll('.player');
  let cell = event.target;
  for(let i = 0; i < allPlayerCell.length; i++) {
    if(cell == allPlayerCell[i] && playerBoard.battleshipCount.length === 0) {
      allPlayerCell[i].classList.add('battleshipHover');
      allPlayerCell[i + 1].classList.add('battleshipHover');
      allPlayerCell[i + 2].classList.add('battleshipHover');
      allPlayerCell[i + 3].classList.add('battleshipHover');
    } else if (cell == allPlayerCell[i] && playerBoard.battleshipCount.length === 1) {
      allPlayerCell[i].classList.add('battleshipHover');
      allPlayerCell[i + 10].classList.add('battleshipHover');
      allPlayerCell[i + 20].classList.add('battleshipHover');
      allPlayerCell[i + 30].classList.add('battleshipHover');
    }  else if (cell == allPlayerCell[i] && playerBoard.battleshipCount.length === 2) {
      allPlayerCell[i].classList.add('battleshipHover');
      allPlayerCell[i + 10].classList.add('battleshipHover');
      allPlayerCell[i + 20].classList.add('battleshipHover');
    }  else if (cell == allPlayerCell[i] && playerBoard.battleshipCount.length === 3) {
      allPlayerCell[i].classList.add('battleshipHover');
      allPlayerCell[i + 1].classList.add('battleshipHover');
      }
  }
}

window.addEventListener('mouseover', (event) => {
  if(event.target.classList.contains('player') && event.target.dataset.x < 7 && playerBoard.battleshipCount.length === 0) {
    removeBattleshipHover()
    addBattleshipHover(event)
  } else if(event.target.classList.contains('player') && event.target.dataset.y < 7 && playerBoard.battleshipCount.length === 1) {
    removeBattleshipHover()
    addBattleshipHover(event)
  } else if(event.target.classList.contains('player') && event.target.dataset.y < 8 && playerBoard.battleshipCount.length === 2) {
    removeBattleshipHover()
    addBattleshipHover(event)
  } else if(event.target.classList.contains('player') && event.target.dataset.x < 9 && playerBoard.battleshipCount.length === 3) {
    removeBattleshipHover()
    addBattleshipHover(event)
  } 
})

function preventingOverlap(event) {
  let allplayerCell = document.querySelectorAll('.player');
  let cell = event.target;
  let initiatingIndex = Array.prototype.indexOf.call(allplayerCell, cell);
  if(playerBoard.battleshipCount.length === 1) {
    if(initiatingIndex < 70) {
      let cell1 = allplayerCell[initiatingIndex];
      let cell2 = allplayerCell[initiatingIndex + 10];
      let cell3 = allplayerCell[initiatingIndex + 20];
      let cell4 = allplayerCell[initiatingIndex + 30];
      if(cell1.classList.contains('shipCell') == true) return false
      else if(cell2.classList.contains('shipCell') == true) return false
      else if(cell3.classList.contains('shipCell') == true) return false
      else if(cell4.classList.contains('shipCell') == true) return false
    }
  } else if(playerBoard.battleshipCount.length === 2) {
    if(initiatingIndex < 80) {
      let cell1 = allplayerCell[initiatingIndex];
      let cell2 = allplayerCell[initiatingIndex + 10];
      let cell3 = allplayerCell[initiatingIndex + 20];
      if(cell1.classList.contains('shipCell') == true) return false
      else if(cell2.classList.contains('shipCell') == true) return false
      else if(cell3.classList.contains('shipCell') == true) return false
    }
  } else if(playerBoard.battleshipCount.length === 3) {
    if(initiatingIndex < 99) {
      let cell1 = allplayerCell[initiatingIndex];
      let cell2 = allplayerCell[initiatingIndex + 1];
      if(cell1.classList.contains('shipCell') == true) return false
      else if(cell2.classList.contains('shipCell') == true) return false
    }
  }

  if(initiatingIndex === 99) return false

  return true
}

function playerBattleshipUpdate() {
  if(playerBoard.sunkenShips.length === 1) return activePlayerBattleship.textContent = "Active Battleship: 3";
  if(playerBoard.sunkenShips.length === 2) return activePlayerBattleship.textContent = "Active Battleship: 2";
  if(playerBoard.sunkenShips.length === 3) return activePlayerBattleship.textContent = "Active Battleship: 1";
  if(playerBoard.sunkenShips.length === 4) return activePlayerBattleship.textContent = "Active Battleship: 0";

  return activePlayerBattleship.textContent = "Active Battleship: 4"
}

function computerBattleshipUpdate() {
  if(computerBoard.sunkenShips.length === 1) return activeComputerBattleship.textContent = "Active Battleship: 3";
  if(computerBoard.sunkenShips.length === 2) return activeComputerBattleship.textContent = "Active Battleship: 2";
  if(computerBoard.sunkenShips.length === 3) return activeComputerBattleship.textContent = "Active Battleship: 1";
  if(computerBoard.sunkenShips.length === 4) return activeComputerBattleship.textContent = "Active Battleship: 0";

  return activeComputerBattleship.textContent = "Active Battleship: 4"
}

function computerPlacedShip1() {
  let placeComputerShip1 = computerBoard.placeShipAt(
    Math.floor(Math.random() * (7 - 0) + 0),
    Math.floor(Math.random() * (9 - 0) + 0),
    computerShip1,
  );

  if(!placeComputerShip1) {
    computerPlacedShip1()
  }
}

function computerPlacedShip2() {
  let placeComputerShip2 = computerBoard.placeShipAt(
    Math.floor(Math.random() * (7 - 0) + 0),
    Math.floor(Math.random() * (9 - 0) + 0),
    computerShip2,
  );

  if(!placeComputerShip2) {
    computerPlacedShip2()
  }
}

function computerPlacedShip3() {
  let placeComputerShip3 = computerBoard.placeShipAt(
    Math.floor(Math.random() * (9 - 0) + 0),
    Math.floor(Math.random() * (7 - 0) + 0),
    computerShip3,
  );

  if(!placeComputerShip3) {
    computerPlacedShip3()
  }
}

function computerPlacedShip4() {
  let placeComputerShip4 = computerBoard.placeShipAt(
    Math.floor(Math.random() * (9 - 0) + 0),
    Math.floor(Math.random() * (8 - 0) + 0),
    computerShip4,
  );

  if(!placeComputerShip4) {
    computerPlacedShip4()
  }
}