const board = document.querySelector(".board");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const upBtn = document.querySelector(".up");
const downBtn = document.querySelector(".down");
const popup = document.getElementById("popup");
const popupWin = document.getElementById("popupWin");
const restartButton = document.getElementById("restartButton");
let returnTime = document.querySelector(".time");
let returnTime2 = document.querySelector(".time2");
let clock = document.querySelector(".clock");
let leaderBoard = document.querySelector(".leaderboard");
let fetchBoard = document.querySelectorAll('.fetchLeaderboard')
let url = "http://localhost:5500";
const cells = [];
let pacmanIndex = 420;
let time = 0;
let isGameOver = false;
const width = 30;
let ghostIndex1 = 0;
let moves = [-1, 1, width, -width];
let move = moves[Math.floor(Math.random() * moves.length)];
const blueprint = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
  1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];



function getName() {
  const playerName = document.getElementById("name");
  let Player = playerName.value;
  localStorage.setItem("Player", Player);
}

function createBoard() {
  for (let i = 0; i < blueprint.length; i++) {
    let cell = document.createElement("div");
    board.appendChild(cell);
    cells.push(cell);
    if (blueprint[i] == 0) {
      cells[i].classList.add("wall");
    } else if (blueprint[i] == 1) {
      cells[i].classList.add("pellet");
    } else if (blueprint[i] == 2) {
      cells[i].classList.add("ghost-home");
    } else if (blueprint[i] == 3) {
      cells[i].classList.add("pac-man");
    }
  }
}
createBoard();
ifHitGhost();
// getScores();
let timer = setInterval(() => {
  time++;
}, 1000);
leftBtn.addEventListener("click", () => {
  cells[pacmanIndex].classList.remove("pac-man");
  moveLeft();
  eatPellets();
  ifHitGhost();
  cells[pacmanIndex].classList.add("pac-man");
});
rightBtn.addEventListener("click", () => {
  cells[pacmanIndex].classList.remove("pac-man");
  moveRight();
  eatPellets();
  ifHitGhost();
  cells[pacmanIndex].classList.add("pac-man");
});
upBtn.addEventListener("click", () => {
  cells[pacmanIndex].classList.remove("pac-man");
  moveUp();
  eatPellets();
  ifHitGhost();
  cells[pacmanIndex].classList.add("pac-man");
});
downBtn.addEventListener("click", () => {
  cells[pacmanIndex].classList.remove("pac-man");
  moveDown();
  eatPellets();
  ifHitGhost();
  cells[pacmanIndex].classList.add("pac-man");
});
function moveLeft() {
  if (
    pacmanIndex % width != 0 &&
    !cells[pacmanIndex - 1].classList.contains("wall")
  ) {
    pacmanIndex -= 1;
  } else if (pacmanIndex == 420) {
    pacmanIndex = 449;
  }
}
function moveRight() {
  if (
    pacmanIndex % width < width - 1 &&
    !cells[pacmanIndex + 1].classList.contains("wall")
  ) {
    pacmanIndex += 1;
  } else if (pacmanIndex == 449) {
    pacmanIndex = 420;
  }
}
function moveUp() {
  if (
    pacmanIndex - width >= 0 &&
    !cells[pacmanIndex - width].classList.contains("wall")
  ) {
    pacmanIndex -= width;
  } else if (pacmanIndex == 14) {
    pacmanIndex = 854;
  }
}
function moveDown() {
  if (
    pacmanIndex + width < blueprint.length - 1 &&
    !cells[pacmanIndex + width].classList.contains("wall")
  ) {
    pacmanIndex += width;
  } else if (pacmanIndex == 854) {
    pacmanIndex = 14;
  }
}
function movePacPac(e) {
  cells[pacmanIndex].classList.remove("pac-man");
  switch (e.keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
  }
  eatPellets();
  ifHitGhost();
  cells[pacmanIndex].classList.add("pac-man");
}
document.addEventListener("keyup", movePacPac);

function eatPellets() {
  if (cells[pacmanIndex].classList.contains("pellet")) {
    cells[pacmanIndex].classList.remove("pellet");
  }
  if (checkWinCondition()) {
    ghosts.forEach((ghost) => clearInterval(ghost.timer));
    document.removeEventListener("keyup", movePacPac);
    clearInterval(timer);
    addScore();
    popupWon();
    getScores();
  }
}
function checkWinCondition() {
  // Loop through all cells to check for remaining pellets
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("pellet")) {
      // There are still pellets remaining, game is not won yet
      return false;
    }
  }
  return true;
}
// ghost movements and creation
class Ghost {
  constructor(startIndex, name, speed) {
    (this.startIndex = startIndex), (this.name = name), (this.speed = speed);
    this.ghostIndex = startIndex;
    this.timer = NaN;
  }
}

const ghosts = [
  new Ghost(181, "Deborah", 400),
  new Ghost(661, "Temitope", 250),
  new Ghost(177, "Issy", 300),
  new Ghost(688, "Francis", 350),
];
ghosts.forEach((ghost) => {
  cells[ghost.startIndex].classList.add("ghost");
  cells[ghost.startIndex].classList.add(ghost.name);
});

ghosts.forEach((ghost) => moveGhost(ghost));
function moveGhost(ghost) {
  ghost.timer = setInterval(() => {
    if (
      !cells[ghost.ghostIndex + move].classList.contains("wall") &&
      !cells[ghost.ghostIndex + move].classList.contains("ghost")
    ) {
      cells[ghost.ghostIndex].classList.remove(ghost.name, "ghost");
      ghost.ghostIndex += move;
      cells[ghost.ghostIndex].classList.add(ghost.name, "ghost");
    } else {
      move = moves[Math.floor(Math.random() * moves.length)];
    }
    ifHitGhost();
  }, ghost.speed);
}

function ifHitGhost() {
  //if ghost hits pac-man or pac-man hits ghost, game endssss
  if (cells[pacmanIndex].classList.contains("ghost")) {
    ghosts.forEach((ghost) => clearInterval(ghost.timer));
    document.removeEventListener("keyup", movePacPac);
    clearInterval(timer);
    isGameOver = true;
    popupRestart();
    getScores();
  }
}

let score;
let timing = setInterval(() => {
  score = convertTime(time)
  clock.innerHTML = score;
  // console.log(convertTime(time))
}, 1000);

function convertTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds}s`;
}



function popupRestart() {
  popup.style.display = "flex";
  returnTime.innerHTML += convertTime(time);
  restartButton.addEventListener("click", () => {
    window.location.href = "index.html";
    popup.style.display = "none";
  });
}

function popupWon() {
  popupWin.style.display = "flex";
  returnTime2.innerHTML += convertTime(time);
  restartButton.addEventListener("click", () => {
    window.location.href = "index.html";
    popupWin.style.display = "none";
  });
}

async function addScore() {
  const player = localStorage.getItem("Player")
   if(player){
      const response = await fetch(`${url}/addScore`, {
        method: "POST",
        body: JSON.stringify({
          name: player,
          score: time,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
    }
  console.log(player, score)
}


async function getScores(){
  const res = await fetch(`${url}/leaderboard`)
  const data = await res.json()
  console.log(data)
  fetchBoard.forEach(tag=>{
    tag.addEventListener('click',()=>{
      leaderBoard.style.display = 'flex'
      popup.style.display = 'none';
      popupWin.style.display = 'none'
    })
  })

  const tbody = document.getElementById("leaderboardBody");
  data.forEach((item, index)=>{
    const row = tbody.insertRow();
    const nameCell = row.insertCell(0);
    const scoreCell = row.insertCell(1);

    nameCell.textContent = item.name;
    scoreCell.textContent = item.score;
  })


}



// function getPacmanPosition() {
//   return cells.findIndex((cell) => cell.classList.contains("pac-man"));
// }


// function moveGhost(ghost) {
//   ghost.timer = setInterval(() => {
//     const pacmanPosition = getPacmanPosition();

//     Calculate the direction towards Pac-Man
//     const direction = calculateDirection(ghost.ghostIndex, pacmanPosition);

//     Check if the next cell in the calculated direction is not a wall or another ghost
//     if (
//       !cells[ghost.ghostIndex + direction].classList.contains("wall") &&
//       !cells[ghost.ghostIndex + direction].classList.contains("ghost")
//     ) {
//       Move the ghost in the calculated direction
//       cells[ghost.ghostIndex].classList.remove(ghost.name, "ghost");
//       ghost.ghostIndex += direction;
//       cells[ghost.ghostIndex].classList.add(ghost.name, "ghost");
//     }

//     Check if the ghost has caught Pac-Man
//     if (ghost.ghostIndex === pacmanPosition) {
//       Handle game over condition here
//     }
//   }, ghost.speed);
// }

// function calculateDirection(ghostPosition, pacmanPosition) {
//   const horizontalDistance = (pacmanPosition % width) - (ghostPosition % width);
//   const verticalDistance =
//     Math.floor(pacmanPosition / width) - Math.floor(ghostPosition / width);

//   if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
//     return horizontalDistance > 0 ? 1 : -1;
//   } else {
//     return verticalDistance > 0 ? width : -width;
//   }
// }
