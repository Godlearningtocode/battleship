import { experiments } from "webpack";
import { Ship } from "../javascript";
import { GameBoard } from "../javascript";
import { player } from "../javascript";

test.skip("makes a new ship with length 5", () => {
  let ship1 = new Ship(5, 0, "abovewater");
  expect(ship1.ships).toMatchObject({ length: 5 });
});

test.skip("increments the hit count for a ship when hit() is called", () => {
  let ship1 = new Ship(1, 0, "Abovewater");
  expect(ship1.hit()).toMatchObject({ hits: 1 });
});

test.skip("changes status of the ship to underwater when hits equal length of the ship", () => {
  let ship1 = new Ship(2, 0, "AboveWater");
  ship1.hit();
  expect(ship1.hit()).toMatchObject({ status: "Underwater" });
});

test.skip("creates a 10x10 grid with coordinates to place ships", () => {
  let battleshipGrid = new GameBoard(10, 10);
  expect(battleshipGrid.makeBoard()).toHaveLength(100);
});

test.skip("creates a 5x5 grid with coordinates to place ships", () => {
  let battleshipGrid = new GameBoard(5, 5);
  expect(battleshipGrid.makeBoard()).toHaveLength(25);
});

test.skip("takes x and y as input and places the ship on the said coordinates according to the ships length and shape.", () => {
  let ship1 = new Ship("ship1", 2, 0, "horizontal", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  expect(battleshipBoard.placeShipAt(5, 5, ship1)).toEqual([
    [5, 5, "ship1"],
    [6, 5, "ship1"],
  ]);
});

test.skip("takes x and y as input and places the ship on the said coordinates according to the ships length and shape.", () => {
  let ship1 = new Ship("ship1", 2, 0, "vertical", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  expect(battleshipBoard.placeShipAt(7, 2, ship1)).toEqual([
    [7, 2, "ship1"],
    [7, 3, "ship1"],
  ]);
});

test.skip("takes x and y as input for attack coordinates and increases hit count if the coordinates match with a ships coordinates", () => {
  let ship1 = new Ship("ship1", 2, 0, "horizontal", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  battleshipBoard.placeShipAt(7, 2, ship1);
  expect(battleshipBoard.recieveAttack(7, 2, ship1)).toEqual(1);
});

test.skip("takes x and y as input for attack coordinates and increases hit count if the coordinates match with a ships coordinates", () => {
  let ship1 = new Ship("ship1", 2, 0, "vertical", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  battleshipBoard.placeShipAt(7, 2, ship1);
  expect(battleshipBoard.recieveAttack(7, 3, ship1)).toEqual(1);
});

test.skip("takes x and y as input for attack coordinates and increases hit count if the coordinates match with a ships coordinates else marks miss on the cooridnates", () => {
  let ship1 = new Ship("ship1", 2, 0, "vertical", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  battleshipBoard.placeShipAt(7, 2, ship1);
  expect(battleshipBoard.recieveAttack(8, 3, ship1)).toContainEqual([8, 3]);
});

test.skip("function that returns true when all ships are sunk.", () => {
  let ship1 = new Ship("ship1", 2, 0, "horizontal", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  battleshipBoard.placeShipAt(5, 5, ship1);
  battleshipBoard.recieveAttack(5, 5, ship1);
  battleshipBoard.recieveAttack(6, 5, ship1);
  expect(battleshipBoard.gameReport()).toBeTruthy();
});

test.skip("function that returns false when all ships are not sunk.", () => {
  let ship1 = new Ship("ship1", 2, 0, "horizontal", "abovewater");
  let battleshipBoard = new GameBoard(10, 10);
  battleshipBoard.makeBoard();
  battleshipBoard.placeShipAt(5, 5, ship1);
  battleshipBoard.recieveAttack(5, 5, ship1);
  expect(battleshipBoard.gameReport()).toBeFalsy();
});

test.skip("player function to alternate turns between player and computer. returns true when legal player plays a turn", () => {
  let playerBattleship1 = new Ship(
    "playerBattleship1",
    2,
    0,
    "horizontal",
    "abovewater",
  );
  let computerBattleship1 = new Ship(
    "computerBattleship1",
    3,
    0,
    "vertical",
    "abovewater",
  );
  let playerBoard = new GameBoard(10, 10);
  let computerBoard = new GameBoard(10, 10);
  playerBoard.makeBoard();
  computerBoard.makeBoard();
  playerBoard.placeShipAt(2, 7, playerBattleship1);
  computerBoard.placeShipAt(8, 7, computerBattleship1);
  expect(
    player(8, 7, computerBattleship1, playerBoard, computerBoard),
  ).toBeTruthy();
});

test.skip("player function to alternate turns between player and computer. returns false when illegal player plays a turn", () => {
  let playerBattleship1 = new Ship(
    "playerBattleship1",
    2,
    0,
    "horizontal",
    "abovewater",
  );
  let computerBattleship1 = new Ship(
    "computerBattleship1",
    3,
    0,
    "vertical",
    "abovewater",
  );
  let playerBoard = new GameBoard(10, 10);
  let computerBoard = new GameBoard(10, 10);
  playerBoard.makeBoard();
  computerBoard.makeBoard();
  playerBoard.placeShipAt(2, 7, playerBattleship1);
  computerBoard.placeShipAt(8, 7, computerBattleship1);
  player(8, 7, computerBattleship1, playerBoard, computerBoard);
  expect(
    player(8, 7, computerBattleship1, playerBoard, computerBoard),
  ).toBeFalsy();
});

test("player function to alternate turns between player and computer. returns false when illegal player plays a turn", () => {
  let playerBattleship1 = new Ship(
    "playerBattleship1",
    2,
    0,
    "horizontal",
    "abovewater",
  );
  let computerBattleship1 = new Ship(
    "computerBattleship1",
    2,
    0,
    "vertical",
    "abovewater",
  );
  let playerBoard = new GameBoard(10, 10);
  let computerBoard = new GameBoard(10, 10);
  playerBoard.makeBoard();
  computerBoard.makeBoard();
  playerBoard.placeShipAt(2, 7, playerBattleship1);
  computerBoard.placeShipAt(8, 7, computerBattleship1);
  player(8, 7, computerBattleship1, playerBoard, computerBoard);
  player(1, 2, playerBattleship1, playerBoard, computerBoard);
  expect(player(8, 8, computerBattleship1, playerBoard, computerBoard)).toEqual(
    "Player has won the game!",
  );
});
