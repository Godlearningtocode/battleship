export function Ship(name, length = 0, hits = 0, shape = null, status = null) {
    let ships = {
        name: name,
        length: length,
        hits: hits,
        shape: shape,
        status: status
    }

    function hit() {
        ships.hits += 1
        isSunk()

        return ships
    }

    function isSunk() {
        if(ships.length === ships.hits) {
            ships.status = 'Underwater';
            return ships
        }

        return ships
    }

    return { ships, hit, isSunk } 
}

export function GameBoard(x, y) {
    let grid = [];

    function makeBoard() {
        for(let i = 0; i < x; i++) {
            for(let j = 0; j < y; j++) {
                grid.push([i, j])
            }
        }

        return grid
    }

    let shipCoordinates = [];
    let battleshipCount = [];
    function placeShipAt(x, y, battleship) {
        let firstCoordinateIndex = grid.findIndex((element) => element[0] === x && element[1] === y)
        grid[firstCoordinateIndex].push(battleship.ships.name);
        shipCoordinates.push(grid[firstCoordinateIndex]);
        if(battleshipCount.includes(battleship) == false) battleshipCount.push(battleship.ships);

        if(battleship.ships.shape == 'horizontal') {
            for(let i = 1; i < battleship.ships.length; i++) {
                let nextCoordinate = grid.findIndex((element) => element[0] === x + i && element[1] === y);
                grid[nextCoordinate].push(battleship.ships.name);
                shipCoordinates.push(grid[nextCoordinate]);
            }
        } else if(battleship.ships.shape == 'vertical') {
            for(let i = 1; i < battleship.ships.length; i++) {
                let nextCoordinate = grid.findIndex((element) => element[0] === x && element[1] === y + i);
                grid[nextCoordinate].push(battleship.ships.name);
                shipCoordinates.push(grid[nextCoordinate]);
            }
        }

        return shipCoordinates
    }

    let missCoordinates = [];
    let sunkenShips = [];
    function recieveAttack(x, y, battleship) {
        if(shipCoordinates.findIndex((element) => element[0] === x && element[1] === y) > -1) {
            battleship.ships.hits += 1
            battleship.isSunk();
            if(battleship.ships.status === 'Underwater' && sunkenShips.includes(battleship) == false) {
                sunkenShips.push(battleship.ships);
            }
            return battleship.ships.hits
        } else if(grid.findIndex((element) => element[0] === x && element[1] === y) > -1) {
            missCoordinates.push(grid[grid.findIndex((element) => element[0] === x && element[1] === y)]);
            return missCoordinates;
        } else return {
            missCoordinates, shipCoordinates
        }
    }


    function gameReport() {
        console.log(battleshipCount.length === sunkenShips.length)
        if(battleshipCount.length === sunkenShips.length) return true

        return false
    }

    return { 
        makeBoard, placeShipAt, recieveAttack, missCoordinates, gameReport, battleshipCount, shipCoordinates
    } 
}

export function player(x, y, battleship, playerGameBoard, computerGameBoard) {
    let players = [playerGameBoard, computerGameBoard];

    let activePlayer = players[0];

    const switchplayer = () => {activePlayer === players[1] ? activePlayer = players[0] : activePlayer = players[1]};

    const computerAttackCoordinatesX = Math.random() * (11 - 0) + 0;
    const computerAttackCoordinatesY = Math.random() * (11 - 0) + 0; 

    if(activePlayer === players[0] && computerGameBoard.battleshipCount.includes(battleship.ships)) {
        computerGameBoard.recieveAttack(x, y, battleship);
        console.log(1)
        if(computerGameBoard.gameReport() == true) return 'Player has won the game!'
        switchplayer();
        return true
    } else if(activePlayer === players[1] && playerGameBoard.battleshipCount.includes(battleship.ships)) {
        playerGameBoard.recieveAttack(computerAttackCoordinatesX, computerAttackCoordinatesY, battleship);
        if(playerGameBoard.gameReport() == true) return 'Computer has won the game.'
        switchplayer();
        return true
    }

    return false
}
/*
let ship1 = new Ship('ship1', 2, 0, 'horizontal', 'abovewater');
let a = new GameBoard(10, 10);
a.makeBoard();
a.placeShipAt(7, 3, ship1);
a.recieveAttack(7, 3, ship1);
a.recieveAttack(8, 3, ship1);
console.log(a.gameReport())*/