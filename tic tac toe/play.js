const moves = {
  1: "cross",
  2: "round",
};

const playerID = {};

function isGameOver(arr) {
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
  ];
  for (const x of winningCombinations) {
    let count = 0;
    for (const y of x) {
      for (const z of arr) {
        if (y == z) {
          count++;
        }
      }
    }
    if (count === 3) {
      return true;
    }
  }
  return false;
}

function setNames() {
  const board = document.querySelector(".playerNames");
  let playerNow = board.firstElementChild;
  for (let i = 1; i <= 2; i++) {
    let spans = playerNow.firstElementChild;
    spans.innerHTML = sessionStorage.getItem(`player ${i}`);
    playerID[spans.innerHTML] = 0;
    spans.nextElementSibling.firstElementChild.innerHTML = `${i == 1 ? "X" : "O"}`;
    spans.nextElementSibling.lastElementChild.innerHTML = `${
      playerID[spans.innerHTML]
    }`
    if (i !== 2) {
      playerNow = board.lastElementChild;
    }
  }
}
let currentPlayer = 1;
let whoHasPlayed = 1;
const divs = document.querySelector(".board").children;
function playGame() {
  // let currentPlayer = 1;
  let playerMoves = {};
  // let whoHasPlayed = 1;
  let gameFinished = false;
  let drawcount = 0;
  for (let key in playerID) {
    playerMoves[key] = [];
  }
  Array.from(divs).forEach((value) => {
    value.addEventListener(
      "click",
      () => {
        if (!gameFinished) {
          playername = sessionStorage.getItem(`player ${whoHasPlayed}`);
          value.classList.add(moves[currentPlayer]);
          playerMoves[playername].push(value.dataset.identity);
          if (isGameOver(playerMoves[playername])) {
            document.getElementById(
              "win-indicate"
            ).innerHTML = `${playername} won the game`;
          
            clearBoard(currentPlayer,false);
            gameFinished = true;
          } else {
            drawcount++;

            whoHasPlayed = whoHasPlayed == 2 ? 1 : 2;

            if (drawcount === 9) {
              document.getElementById("win-indicate").innerHTML = `draw game!`;
              clearBoard(currentPlayer,true);
            }
          }
          currentPlayer = currentPlayer == 1 ? 2 : 1;
        }
      },
      { once: true }
    );
  });
}

function clearBoard(currentPlayer,sign) {
  const resetButton = document.getElementById("reset");
  resetButton.style.visibility = "visible";
  resetButton.addEventListener("click", () => {
    Array.from(divs).forEach((value) => {
      value.classList.remove("round", "cross");
    });
    document.getElementById("win-indicate").innerHTML = "";
    resetButton.style.visibility = "hidden";
    if(!sign){
      const scorecard = document.getElementById(`player-${currentPlayer}`).lastElementChild.lastElementChild;
      scorecard.innerHTML= Number(scorecard.innerHTML)+1
    }else{
      whoHasPlayed = whoHasPlayed == 2 ? 1 : 2;
    }
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    whoHasPlayed = whoHasPlayed == 1 ? 2 : 1;
    playGame();
  },{once:true});
}

async function main() {
  setNames();
  playGame();
}
main();
