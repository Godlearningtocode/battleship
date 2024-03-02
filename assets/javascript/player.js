//declaring a global variable for activeplayer to export and update the value in global space
let activePlayer = 0;

//function to change player turn and then accordingly play the attack turn (i.e GameBoard.recieveAttack()).
export function player(x, y, playerBoard, computerBoard, battleship) {
  const switchplayer = () => {
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
  };

  if (activePlayer === 0) {
    computerBoard.recieveAttack(x, y, battleship);
    switchplayer();
  } else if (activePlayer === 1) {
    playerBoard.recieveAttack(x, y, battleship);
    switchplayer();
  }

  return false;
}

export { activePlayer };
