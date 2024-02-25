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
        if(battleshipCount.includes(battleship) == false) battleshipCount.push(battleship);

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
                sunkenShips.push(battleship);
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
        if(battleshipCount.length === sunkenShips.length) return true

        return false
    }

    return { 
        makeBoard, placeShipAt, recieveAttack, missCoordinates, gameReport
    } 
}
/*
let ship1 = new Ship('ship1', 2, 0, 'horizontal', 'abovewater');
let a = new GameBoard(10, 10);
a.makeBoard();
a.placeShipAt(7, 3, ship1);
a.recieveAttack(7, 3, ship1);
a.recieveAttack(8, 3, ship1);
console.log(a.gameReport())*/