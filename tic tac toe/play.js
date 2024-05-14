const moves = {
  X: "cross",
  O: "round",
};

const playerMove = {};
let current = "X";

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
  let currentPlayer = board.firstElementChild;
  for (let i = 1; i <= 2; i++) {
    let spans = currentPlayer.firstElementChild;
    spans.innerHTML = sessionStorage.getItem(`player ${i}`);
    playerMove[spans.innerHTML] = [];
    spans.nextElementSibling.innerHTML = i == 1 ? "X" : "O";
    if (i !== 2) {
      currentPlayer = board.lastElementChild;
    }
  }
}

let playerIdentity = 1;

function playGame() {
  const divs = document.querySelector(".board").children;
  let gameOver = false;
  let drawCount = 0;
  Array.from(divs).forEach((value) => {
    const onclickFunction = () => {
      if (gameOver) {
      } else {
        const currentPlayer = sessionStorage.getItem(
          `player ${playerIdentity}`
        );
        value.classList.add(moves[current], "clicked");
        playerMove[currentPlayer].push(value.dataset.idebtity);
        const result = isGameOver(playerMove[currentPlayer]);

        if (result) {
          document.getElementById(
            "win-indicate"
          ).innerHTML = `<h1 id="win-indicate">${currentPlayer} won the game</h1>`;
          gameOver = true;
        }else{
          drawCount++;
        }
        
        if(drawCount===9){
          document.getElementById(
            "win-indicate"
          ).innerHTML = `<h1 id="win-indicate">Game draw</h1>`;
        }
        playerIdentity = playerIdentity == 1 ? 2 : 1;
        current = current === "X" ? "O" : "X";
        value.removeEventListener("click", onclickFunction);
      }
    };

    value.addEventListener("click", onclickFunction);
  });
}

async function main() {
  setNames();
  playGame();
  console.log(playerMove);
}
main();
