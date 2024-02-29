//Importing assets
import '/assets/css/styles.css'
import { Ship } from './ship';
import { GameBoard } from './gameboard';
import { player } from './player';
import { activePlayer } from './player';


//Assigning variables and constants for gameboard and ships while also placeing the ships
const playerShip1 = new Ship('playerShip1', 4, 0, 'horizontal', 'abovewater');
const playerShip2 = new Ship('playerShip2', 4, 0, 'vertical', 'abovewater');
const playerShip3 = new Ship('playerShip3', 3, 0, 'vertical', 'abovewater');
const playerShip4 = new Ship('playerShip4', 2, 0, 'horizontal', 'abovewater');
const computerShip1 = new Ship('computerShip1', 4, 0, 'horizontal', 'abovewater')
const computerShip2 = new Ship('computerShip2', 4, 0, 'horizontal', 'abovewater')
const computerShip3 = new Ship('computerShip3', 3, 0, 'vertical', 'abovewater')
const computerShip4 = new Ship('computerShip4', 2, 0, 'vertical', 'abovewater')
let playerBoard = new GameBoard(10, 10);
let computerBoard = new GameBoard(10, 10);
playerBoard.makeBoard()
computerBoard.makeBoard()
playerBoard.placeShipAt(0, 0, playerShip1)
playerBoard.placeShipAt(5, 4, playerShip2)
playerBoard.placeShipAt(7, 1, playerShip3)
playerBoard.placeShipAt(2, 9, playerShip4)
computerBoard.placeShipAt(6, 6, computerShip1)
computerBoard.placeShipAt(2, 0, computerShip2)
computerBoard.placeShipAt(7, 1, computerShip3)
computerBoard.placeShipAt(0, 4, computerShip4)
let playerGrid = []
let playerShipsArray = [playerShip1, playerShip2, playerShip3, playerShip4];
let computerShipArray = [computerShip1, computerShip2, computerShip3, computerShip4];
let xCoordinateArrayPlayer = [];
let yCoordinateArrayPlayer = [];
const playerSection = document.querySelector('#playerSection');
const computerSection = document.querySelector('#computerSection');
const instructionHeading = document.querySelector('#instructionHeading');


//DOM manipulation
instructionHeading.innerHTML = "players's turn"

//Functions:-
//Function for populating player gameboard
function populatePlayerBoard() {
    for(let i = 0; i < playerBoard.grid.length; i++) {
        const cell = document.createElement('div');
        const x = playerBoard.grid[i][0]
        const y = playerBoard.grid[i][1]
        const battleship = playerBoard.grid[i][2];
        playerGrid.push([x, y])
        xCoordinateArrayPlayer.push(x);
        yCoordinateArrayPlayer.push(y)
        cell.dataset.x = x
        cell.dataset.y = y
        cell.dataset.battleship = battleship
        if(playerBoard.grid[i].length > 2) cell.classList.add('shipCell')
        cell.classList.add('cell');
        cell.classList.add('player');
        cell.id = (`${cell.dataset.x}${cell.dataset.y}`)
        playerSection.appendChild(cell)
    }
}

//Function for populating computer board
function populateComputerBoard() {
    for(let i = 0; i < computerBoard.grid.length; i++) {
        const cell = document.createElement('div');
        const x = computerBoard.grid[i][0]
        const y = computerBoard.grid[i][1]
        const ship = computerBoard.grid[i][2]
        cell.dataset.x = x
        cell.dataset.y = y
        cell.dataset.battleship = ship;
        if(computerBoard.grid[i].length > 2) cell.classList.add('shipCell')
        cell.classList.add('cell');
        cell.classList.add('computer')
        computerSection.appendChild(cell);
    }
}

//Function to shiffle the playerGrid coordinates so it picks a unique number and then removes it from the array to avoid repitation
function shufflePlayerGrid(playerGrid) {
    let m = playerGrid.length, t, i;

    while(m) {
        i = Math.floor(Math.random() * m--);

        t = playerGrid[m];
        playerGrid[m] = playerGrid[i];
        playerGrid[i] = t;
    }

    return playerGrid;
}

//Function for computer turn running after 1000ms when the click event for the player turn is triggered
function computerTurn(activePlayer) {
    const computerAttackCoordinates = playerGrid.pop()
    const computerAttackCoordinatesX = computerAttackCoordinates[0]
    const computerAttackCoordinatesY = computerAttackCoordinates[1]
    let battleshipName = null;
    let playerBattleship;
    let playerCellList = document.querySelectorAll('.player');
    let playerCell;

    for(let i = 0; i < playerBoard.shipCoordinates.length; i++) {
        if(playerBoard.shipCoordinates[i][0] == computerAttackCoordinatesX && playerBoard.shipCoordinates[i][1] == computerAttackCoordinatesY) battleshipName = playerBoard.shipCoordinates[i][2]
    }

    if(battleshipName != null) {
        playerBattleship = playerShipsArray[playerShipsArray.findIndex((element) => element.ships.name === battleshipName)]
    }

    for(let i = 0; i < playerCellList.length; i++) {
        if(playerCellList[i].dataset.x == computerAttackCoordinatesX && playerCellList[i].dataset.y == computerAttackCoordinatesY) {
            playerCell = playerCellList[i];
        }
    }

    if(playerCell.classList.contains('player') && playerCell.classList.contains('shipCell') && activePlayer == 1) {
        playerCell.classList.add('shipHit')
        player(computerAttackCoordinatesX, computerAttackCoordinatesY, playerBoard, computerBoard, playerBattleship)
        playerCell.classList.remove('player')
    } else if(playerCell.classList.contains('cell') && playerCell.classList.contains('player') && !playerCell.classList.contains('shipHit') && activePlayer == 1) {
        playerCell.classList.add('missHit')
        player(computerAttackCoordinatesX, computerAttackCoordinatesY, playerBoard, computerBoard, playerBattleship)
        playerCell.classList.remove('player')
    }

    instructionHeading.textContent = "Player's turn";

    if(playerBoard.gameReport() == true) instructionHeading.textContent = "Computer has won the game."
}


//Event Listeners:-
//DOMContentLoaded event listener for when the webpage is loaded
window.addEventListener('DOMContentLoaded', () => {
    populatePlayerBoard();
    populateComputerBoard();
    shufflePlayerGrid(playerGrid);
})

//Click event listener for when the player clicks on the computer game board
window.addEventListener('click', (event) => {
    let cell = event.target;
    let computerBattleship = computerShipArray[computerShipArray.findIndex((element) => element.ships.name == cell.dataset.battleship)]
    if(cell.classList.contains('shipCell') && cell.classList.contains('computer') && activePlayer == 0) {
        player(cell.dataset.x, cell.dataset.y, playerBoard, computerBoard, computerBattleship);
        cell.classList.add('shipHit')
        cell.classList.remove('computer')
        
        instructionHeading.textContent = "Computer's turn"

        if(computerBoard.gameReport() == true) return instructionHeading.innerHTML = 'Player has won the game!';

        setTimeout(() => {
            computerTurn(activePlayer)
        }, 1000);
    } else if(cell.classList.contains('cell') && cell.classList.contains('computer') && !cell.classList.contains('shipHit') && activePlayer == 0) {
        player(cell.dataset.x, cell.dataset.y, playerBoard, computerBoard, computerBattleship)
        cell.classList.add('missHit');
        cell.classList.remove('computer')
        
        instructionHeading.textContent = "Computer's turn";

        if(computerBoard.gameReport() == true) return instructionHeading.innerHTML = 'Player has won the game!';

        setTimeout(() => {
            computerTurn(activePlayer)
        }, 1000);
    }
})