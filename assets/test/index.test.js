import { experiments } from "webpack";
import { Ship } from "../javascript";
import { GameBoard } from "../javascript";

test.skip('makes a new ship with length 5', () => {
    let ship1 = new Ship(5, 0, 'abovewater');
    expect(ship1.ships).toMatchObject({length: 5})
})

test.skip('increments the hit count for a ship when hit() is called', () => {
    let ship1 = new Ship(1, 0, 'Abovewater');
    expect(ship1.hit()).toMatchObject({hits: 1})
})

test.skip('changes status of the ship to underwater when hits equal length of the ship', () => {
    let ship1 = new Ship(2, 0, 'AboveWater');
    ship1.hit()
    expect(ship1.hit()).toMatchObject({status: 'Underwater'})
})

test.skip('creates a 10x10 grid with coordinates to place ships', () => {
    let battleshipGrid = new GameBoard(10, 10);
    expect(battleshipGrid.makeBoard()).toHaveLength(100)
})

test.skip('creates a 5x5 grid with coordinates to place ships', () => {
    let battleshipGrid = new GameBoard(5, 5);
    expect(battleshipGrid.makeBoard()).toHaveLength(25)
})

test.skip('takes x and y as input and places the ship on the said coordinates according to the ships length and shape.', () => {
    let ship1 = new Ship('ship1', 2, 0, 'horizontal', 'abovewater')
    let battleshipBoard = new GameBoard(10, 10, ship1);
    battleshipBoard.makeBoard();
    expect(battleshipBoard.placeShipAt(5, 5)).toEqual([[5, 5, 'ship1'], [6, 5, 'ship1']])
})

test.skip('takes x and y as input and places the ship on the said coordinates according to the ships length and shape.', () => {
    let ship1 = new Ship('ship1', 2, 0, 'vertical', 'abovewater')
    let battleshipBoard = new GameBoard(10, 10, ship1);
    battleshipBoard.makeBoard();
    expect(battleshipBoard.placeShipAt(7, 2)).toEqual([[7, 2, 'ship1'], [7, 3, 'ship1']])
})

test('takes x and y as input for attack coordinates and increases hit count if the coordinates match with a ships coordinates', () => {
    let ship1 = new Ship('ship1', 2, 0, 'horizontal', 'abovewater');
    let battleshipBoard = new GameBoard(10, 10, ship1);
    battleshipBoard.makeBoard();
    battleshipBoard.placeShipAt(7, 2);
    expect(battleshipBoard.recieveAttack(7, 3)).toEqual(1)
})