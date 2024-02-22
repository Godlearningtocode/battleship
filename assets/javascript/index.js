 function Ship(name, length = 0, hits = 0, shape = null, status = null) {
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
        if(ships.length <= ships.hits) {
            ships.status = 'Underwater';
            return ships
        }

        return ships
    }

    return { ships, hit, isSunk } 
}

 function GameBoard(x, y, battleship) {
    let grid = []

    function makeBoard() {
        for(let i = 0; i < x; i++) {
            for(let j = 0; j < y; j++) {
                grid.push([i, j])
            }
        }

        return grid
    }

    let shipCoordinates = []
    function placeShipAt(x, y) {
        let firstCoordinateIndex = grid.findIndex((element) => element[0] === x && element[1] === y)
        grid[firstCoordinateIndex].push(battleship.ships.name);
        shipCoordinates.push(grid[firstCoordinateIndex])

        if(battleship.ships.shape == 'horizontal') {
            for(let i = 1; i < battleship.ships.length; i++) {
                let nextCoordinate = grid.findIndex((element) => element[0] === x + i && element[1] === y);
                grid[nextCoordinate].push(battleship.ships.name);
                shipCoordinates.push(grid[nextCoordinate])
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

    function recieveAttack(x, y) {
        if(shipCoordinates.findIndex((element) => element[0] === x && element[1] === y) > -1) {
            battleship.ships.hits += 1
            return battleship.ships.hits
        } else return battleship.ships.hits
    }

    return { 
        makeBoard, placeShipAt, recieveAttack
    } 
}

let ship1 = new Ship('ship1', 2, 0, 'vertical', 'abovewater');
let a = new GameBoard(10, 10, ship1);
a.makeBoard();
a.placeShipAt(7, 3);
console.log(a.recieveAttack(7, 4))