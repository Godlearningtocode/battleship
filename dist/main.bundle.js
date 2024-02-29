/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/javascript/gameboard.js":
/*!****************************************!*\
  !*** ./assets/javascript/gameboard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard)\n/* harmony export */ });\n//GameBoard factory function for creating the grid, placing ships, attacking the grid and then game report for if a winner is decided.\nfunction GameBoard(x, y) {\n    //declaring varibales\n    let grid = [];\n    let shipCoordinates = [];\n    let battleshipCount = [];\n    let missCoordinates = [];\n    let sunkenShips = [];\n\n    //function makeBoard to push the coordinates to the grid array\n    function makeBoard() {\n        for(let i = 0; i < x; i++) {\n            for(let j = 0; j < y; j++) {\n                grid.push([j, i])\n            }\n        }\n        return grid\n    }\n\n    //function to place ships at the x and y coordinates\n    function placeShipAt(x, y, battleship) {\n        let firstCoordinateIndex = grid.findIndex((element) => element[0] === x && element[1] === y)\n        grid[firstCoordinateIndex].push(battleship.ships.name);\n        shipCoordinates.push(grid[firstCoordinateIndex]);\n        if(battleshipCount.includes(battleship) == false) battleshipCount.push(battleship.ships);\n\n        if(battleship.ships.shape == 'horizontal') {\n            for(let i = 1; i < battleship.ships.length; i++) {\n                let nextCoordinate = grid.findIndex((element) => element[0] === x + i && element[1] === y);\n                grid[nextCoordinate].push(battleship.ships.name);\n                shipCoordinates.push(grid[nextCoordinate]);\n            }\n        } else if(battleship.ships.shape == 'vertical') {\n            for(let i = 1; i < battleship.ships.length; i++) {\n                let nextCoordinate = grid.findIndex((element) => element[0] === x && element[1] === y + i);\n                grid[nextCoordinate].push(battleship.ships.name);\n                shipCoordinates.push(grid[nextCoordinate]);\n            }\n        }\n\n        return shipCoordinates\n    }\n\n    //function to attack the enemey ship at x and y coordinates\n    function recieveAttack(x, y, battleship) {\n        if(shipCoordinates.findIndex((element) => element[0] == x && element[1] == y) > -1) {\n            battleship.ships.hits += 1\n            battleship.isSunk();\n            if(battleship.ships.status === 'Underwater' && sunkenShips.includes(battleship) == false) {\n                sunkenShips.push(battleship.ships);\n            }\n            return battleship.ships.hits\n        } else {\n            missCoordinates.push(grid[grid.findIndex((element) => element[0] == x && element[1] == y)]);\n            return {\n                missCoordinates, shipCoordinates\n            }\n        } \n    }\n\n    //function to check if the game is over and if a winner is decided or not\n    function gameReport() {\n        if(battleshipCount.length === sunkenShips.length) return true\n\n        return false\n    }\n\n    return { \n        makeBoard, placeShipAt, recieveAttack, missCoordinates, gameReport, battleshipCount, shipCoordinates, grid\n    } \n}\n\n//# sourceURL=webpack://battleship/./assets/javascript/gameboard.js?");

/***/ }),

/***/ "./assets/javascript/index.js":
/*!************************************!*\
  !*** ./assets/javascript/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../assets/css/styles.css */ \"./assets/css/styles.css\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./assets/javascript/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ \"./assets/javascript/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ \"./assets/javascript/player.js\");\n//Importing assets\n\n\n\n\n\n\n\n//Assigning variables and constants for gameboard and ships while also placeing the ships\nconst playerShip1 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('playerShip1', 4, 0, 'horizontal', 'abovewater');\nconst playerShip2 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('playerShip2', 4, 0, 'vertical', 'abovewater');\nconst playerShip3 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('playerShip3', 3, 0, 'vertical', 'abovewater');\nconst playerShip4 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('playerShip4', 2, 0, 'horizontal', 'abovewater');\nconst computerShip1 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('computerShip1', 4, 0, 'horizontal', 'abovewater')\nconst computerShip2 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('computerShip2', 4, 0, 'horizontal', 'abovewater')\nconst computerShip3 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('computerShip3', 3, 0, 'vertical', 'abovewater')\nconst computerShip4 = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship('computerShip4', 2, 0, 'vertical', 'abovewater')\nlet playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.GameBoard(10, 10);\nlet computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.GameBoard(10, 10);\nplayerBoard.makeBoard()\ncomputerBoard.makeBoard()\nplayerBoard.placeShipAt(0, 0, playerShip1)\nplayerBoard.placeShipAt(5, 4, playerShip2)\nplayerBoard.placeShipAt(7, 1, playerShip3)\nplayerBoard.placeShipAt(2, 9, playerShip4)\ncomputerBoard.placeShipAt(6, 6, computerShip1)\ncomputerBoard.placeShipAt(2, 0, computerShip2)\ncomputerBoard.placeShipAt(7, 1, computerShip3)\ncomputerBoard.placeShipAt(0, 4, computerShip4)\nlet playerGrid = []\nlet playerShipsArray = [playerShip1, playerShip2, playerShip3, playerShip4];\nlet computerShipArray = [computerShip1, computerShip2, computerShip3, computerShip4];\nlet xCoordinateArrayPlayer = [];\nlet yCoordinateArrayPlayer = [];\nconst playerSection = document.querySelector('#playerSection');\nconst computerSection = document.querySelector('#computerSection');\nconst instructionHeading = document.querySelector('#instructionHeading');\n\n\n//DOM manipulation\ninstructionHeading.innerHTML = \"players's turn\"\n\n//Functions:-\n//Function for populating player gameboard\nfunction populatePlayerBoard() {\n    for(let i = 0; i < playerBoard.grid.length; i++) {\n        const cell = document.createElement('div');\n        const x = playerBoard.grid[i][0]\n        const y = playerBoard.grid[i][1]\n        const battleship = playerBoard.grid[i][2];\n        playerGrid.push([x, y])\n        xCoordinateArrayPlayer.push(x);\n        yCoordinateArrayPlayer.push(y)\n        cell.dataset.x = x\n        cell.dataset.y = y\n        cell.dataset.battleship = battleship\n        if(playerBoard.grid[i].length > 2) cell.classList.add('shipCell')\n        cell.classList.add('cell');\n        cell.classList.add('player');\n        cell.id = (`${cell.dataset.x}${cell.dataset.y}`)\n        playerSection.appendChild(cell)\n    }\n}\n\n//Function for populating computer board\nfunction populateComputerBoard() {\n    for(let i = 0; i < computerBoard.grid.length; i++) {\n        const cell = document.createElement('div');\n        const x = computerBoard.grid[i][0]\n        const y = computerBoard.grid[i][1]\n        const ship = computerBoard.grid[i][2]\n        cell.dataset.x = x\n        cell.dataset.y = y\n        cell.dataset.battleship = ship;\n        if(computerBoard.grid[i].length > 2) cell.classList.add('shipCell')\n        cell.classList.add('cell');\n        cell.classList.add('computer')\n        computerSection.appendChild(cell);\n    }\n}\n\n//Function to shiffle the playerGrid coordinates so it picks a unique number and then removes it from the array to avoid repitation\nfunction shufflePlayerGrid(playerGrid) {\n    let m = playerGrid.length, t, i;\n\n    while(m) {\n        i = Math.floor(Math.random() * m--);\n\n        t = playerGrid[m];\n        playerGrid[m] = playerGrid[i];\n        playerGrid[i] = t;\n    }\n\n    return playerGrid;\n}\n\n//Function for computer turn running after 1000ms when the click event for the player turn is triggered\nfunction computerTurn(activePlayer) {\n    const computerAttackCoordinates = playerGrid.pop()\n    const computerAttackCoordinatesX = computerAttackCoordinates[0]\n    const computerAttackCoordinatesY = computerAttackCoordinates[1]\n    let battleshipName = null;\n    let playerBattleship;\n    let playerCellList = document.querySelectorAll('.player');\n    let playerCell;\n\n    for(let i = 0; i < playerBoard.shipCoordinates.length; i++) {\n        if(playerBoard.shipCoordinates[i][0] == computerAttackCoordinatesX && playerBoard.shipCoordinates[i][1] == computerAttackCoordinatesY) battleshipName = playerBoard.shipCoordinates[i][2]\n    }\n\n    if(battleshipName != null) {\n        playerBattleship = playerShipsArray[playerShipsArray.findIndex((element) => element.ships.name === battleshipName)]\n    }\n\n    for(let i = 0; i < playerCellList.length; i++) {\n        if(playerCellList[i].dataset.x == computerAttackCoordinatesX && playerCellList[i].dataset.y == computerAttackCoordinatesY) {\n            playerCell = playerCellList[i];\n        }\n    }\n\n    if(playerCell.classList.contains('player') && playerCell.classList.contains('shipCell') && activePlayer == 1) {\n        playerCell.classList.add('shipHit')\n        ;(0,_player__WEBPACK_IMPORTED_MODULE_3__.player)(computerAttackCoordinatesX, computerAttackCoordinatesY, playerBoard, computerBoard, playerBattleship)\n        playerCell.classList.remove('player')\n    } else if(playerCell.classList.contains('cell') && playerCell.classList.contains('player') && !playerCell.classList.contains('shipHit') && activePlayer == 1) {\n        playerCell.classList.add('missHit')\n        ;(0,_player__WEBPACK_IMPORTED_MODULE_3__.player)(computerAttackCoordinatesX, computerAttackCoordinatesY, playerBoard, computerBoard, playerBattleship)\n        playerCell.classList.remove('player')\n    }\n\n    instructionHeading.textContent = \"Player's turn\";\n\n    if(playerBoard.gameReport() == true) instructionHeading.textContent = \"Computer has won the game.\"\n}\n\n\n//Event Listeners:-\n//DOMContentLoaded event listener for when the webpage is loaded\nwindow.addEventListener('DOMContentLoaded', () => {\n    populatePlayerBoard();\n    populateComputerBoard();\n    shufflePlayerGrid(playerGrid);\n})\n\n//Click event listener for when the player clicks on the computer game board\nwindow.addEventListener('click', (event) => {\n    let cell = event.target;\n    let computerBattleship = computerShipArray[computerShipArray.findIndex((element) => element.ships.name == cell.dataset.battleship)]\n    if(cell.classList.contains('shipCell') && cell.classList.contains('computer') && _player__WEBPACK_IMPORTED_MODULE_3__.activePlayer == 0) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_3__.player)(cell.dataset.x, cell.dataset.y, playerBoard, computerBoard, computerBattleship);\n        cell.classList.add('shipHit')\n        cell.classList.remove('computer')\n        \n        instructionHeading.textContent = \"Computer's turn\"\n\n        if(computerBoard.gameReport() == true) return instructionHeading.innerHTML = 'Player has won the game!';\n\n        setTimeout(() => {\n            computerTurn(_player__WEBPACK_IMPORTED_MODULE_3__.activePlayer)\n        }, 1000);\n    } else if(cell.classList.contains('cell') && cell.classList.contains('computer') && !cell.classList.contains('shipHit') && _player__WEBPACK_IMPORTED_MODULE_3__.activePlayer == 0) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_3__.player)(cell.dataset.x, cell.dataset.y, playerBoard, computerBoard, computerBattleship)\n        cell.classList.add('missHit');\n        cell.classList.remove('computer')\n        \n        instructionHeading.textContent = \"Computer's turn\";\n\n        if(computerBoard.gameReport() == true) return instructionHeading.innerHTML = 'Player has won the game!';\n\n        setTimeout(() => {\n            computerTurn(_player__WEBPACK_IMPORTED_MODULE_3__.activePlayer)\n        }, 1000);\n    }\n})\n\n//# sourceURL=webpack://battleship/./assets/javascript/index.js?");

/***/ }),

/***/ "./assets/javascript/player.js":
/*!*************************************!*\
  !*** ./assets/javascript/player.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   activePlayer: () => (/* binding */ activePlayer),\n/* harmony export */   player: () => (/* binding */ player)\n/* harmony export */ });\n//declaring a global variable for activeplayer to export and update the value in global space\nlet activePlayer = 0\n\n//function to change player turn and then accordingly play the attack turn (i.e GameBoard.recieveAttack()).\nfunction player(x, y, playerBoard, computerBoard, battleship) {\n    const switchplayer = () => {\n        if(activePlayer === 0) {\n            activePlayer = 1\n        } else {\n            activePlayer = 0\n        }\n    }\n\n    if(activePlayer === 0) {\n        computerBoard.recieveAttack(x, y, battleship);\n        switchplayer();\n    } else if(activePlayer === 1) {\n        playerBoard.recieveAttack(x, y, battleship);\n        switchplayer();\n    }\n\n    return false\n}\n\n\n\n//# sourceURL=webpack://battleship/./assets/javascript/player.js?");

/***/ }),

/***/ "./assets/javascript/ship.js":
/*!***********************************!*\
  !*** ./assets/javascript/ship.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\n//Ship factory function to build new ships\nfunction Ship(name, length = 0, hits = 0, shape = null, status = null) {\n    //declaring a ships object to store and access properties of the ships\n    let ships = {\n        name: name,\n        length: length,\n        hits: hits,\n        shape: shape,\n        status: status\n    }\n\n    //function hit to increase the hit count of the ship\n    function hit() {\n        ships.hits += 1\n        isSunk()\n\n        return ships\n    }\n\n    //function to check if the ship is underwater or not.\n    function isSunk() {\n        if(ships.length === ships.hits) {\n            ships.status = 'Underwater';\n            return ships\n        }\n\n        return ships\n    }\n\n    return { ships, hit, isSunk } \n}\n\n//# sourceURL=webpack://battleship/./assets/javascript/ship.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/css/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/css/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `html, body {\n    margin: 0px;\n    padding: 0px;\n}\n\n#contentSection {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 50px;\n}\n\n#gameBoardContainer {\n    display: flex;\n    flex-direction: row;\n    gap: 40px;\n}\n\n#gameSection {\n    display: flex;\n    flex-direction: column;\n    gap: 40px;\n    align-items: center;\n    justify-content: center;\n}\n\n#playerSection {\n    display: grid;\n    grid-template-rows: repeat(10, 2fr);\n    grid-template-columns: repeat(10, 2fr);\n    background-color: black;\n    gap: 3px;\n    padding: 3px;\n}\n\n#computerSection {\n    display: grid;\n    gap: 3px;\n    padding: 3px;\n    background-color: black;\n    grid-template-rows: repeat(10, 2fr);\n    grid-template-columns: repeat(10, 2fr);\n}\n\n.cell {\n    background-color: white;\n    width: 40px;\n    height: 40px;\n}\n\n.shipHit {\n    background-color: red;\n}\n\n.missHit {\n    background-color: green;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./assets/css/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./assets/css/styles.css":
/*!*******************************!*\
  !*** ./assets/css/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./assets/css/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./assets/css/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./assets/javascript/index.js");
/******/ 	__webpack_require__("./assets/javascript/gameboard.js");
/******/ 	__webpack_require__("./assets/javascript/ship.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/javascript/player.js");
/******/ 	
/******/ })()
;