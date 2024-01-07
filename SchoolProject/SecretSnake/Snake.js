//
//Selectors
//
const gameBoard = document.querySelector("#gameBoard");
const scoreText = document.querySelector("#scoreText");
const radioInput = document.querySelectorAll("input[type=radio]");

const c = gameBoard.getContext("2d");
//
//Global consts and lets
//

//Const
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

//Default parts of the game
let unitSize = 25;
let foodMax = 3;
let tickTime = 75;
let score = 0;
let difficultyIs;
let diff = "easy";
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

//Colors
let foodColor;
let headColor;
let snakeColor;
let tailColor;

//Default Colors
let boardBackground = "lightgreen";
let snakeBorder = "black";
colorInputFood.value = "#FF0000";
colorInputHead.value = "#005A00";
colorInputBody.value = "#008300";
colorInputTail.value = "#00B400";

//Food
let foodX;
let foodY;
let foodCreated = 0;
let foodStorage = {
  food1: {
    x: "no",
    y: "no",
  },
  food2: {
    x: "no",
    y: "no",
  },
  food3: {
    x: "no",
    y: "no",
  },
  food4: {
    x: "no",
    y: "no",
  },
  food5: {
    x: "no",
    y: "no",
  },
};

let food1X = foodStorage.food1.x;
let food1Y = foodStorage.food1.y;
let food2X = foodStorage.food2.x;
let food2Y = foodStorage.food2.y;
let food3X = foodStorage.food3.x;
let food3Y = foodStorage.food3.y;
let food4X = foodStorage.food4.x;
let food4Y = foodStorage.food4.y;
let food5X = foodStorage.food5.x;
let food5Y = foodStorage.food5.y;

//Tick time
let timeOut1;

//Move snake
let xSpeed = unitSize;
let ySpeed = 0;

//Booleans
let directionChanged = false;
let running = false;
let reseted = false;
let gameOver = false;
let menuApply = false;
let diffChange = false;
let inMenuOpen = false;
let customGamemode = false;
let customGamemodeP = false;
let someChange = false;

//
//EventListeners
//

//Key press
window.addEventListener("keydown", changeDirection);
window.addEventListener("keydown", startResetMenu);
window.addEventListener("keydown", (e) => {
  if (
    (e.keyCode === 32 ||
      e.keyCode === 38 ||
      e.keyCode === 37 ||
      e.keyCode === 40 ||
      e.keyCode === 39) &&
    e.target === document.body
  ) {
    e.preventDefault();
  }
});

//Main buttons
reset.addEventListener("click", resetGame);
start.addEventListener("click", gameStart);
openMenu.addEventListener("click", doOpenMenu);

//Moving for Mobile
arrowUp.addEventListener("click", () => {
  changeDirection(38);
});
arrowLeft.addEventListener("click", () => {
  changeDirection(37);
});
arrowDown.addEventListener("click", () => {
  changeDirection(40);
});
arrowRight.addEventListener("click", () => {
  changeDirection(39);
});

//Menu buttons
apply.addEventListener("click", startPage);
difficulty.addEventListener("click", openDifficulty);
highestScore.addEventListener("click", highScore);
colors.addEventListener("click", openColorsMenu);
create.addEventListener("click", openCustomGamemodeMenu);
radioInput.forEach((radio) =>
  radio.addEventListener("change", () => {
    someChange = true;
  })
);

//Difficulty buttons
superEasy.addEventListener("click", () => {
  diff = "superEasy";
  someChange = true;
});
superEasy.addEventListener("click", chooseDifficulty);
easy.addEventListener("click", () => {
  diff = "easy";
  someChange = true;
});
easy.addEventListener("click", chooseDifficulty);
medium.addEventListener("click", () => {
  diff = "medium";
  someChange = true;
});
medium.addEventListener("click", chooseDifficulty);
hard.addEventListener("click", () => {
  diff = "hard";
  someChange = true;
});
hard.addEventListener("click", chooseDifficulty);

//
//Functions
//

//Opens menu
function doOpenMenu() {
  if (gameOver) {
    resetGame();
  }
  menuApply = false;
  running = false;
  clearBoard();
  clearTimeout(timeOut1);
  gameMenu.classList.remove("none");
}

//Press Start page
function startPage(customGamemode) {
  if (inMenuOpen === true) {
    DCHC.classList.remove("none");
    difficultyChoose.classList.add("none");
    yourHighestScore.classList.add("none");
    colorMenu.classList.add("none");
    createOwnGameMenu.classList.add("none");
  } else if (!menuApply || reseted) {
    menuApply = true;

    gameMenu.classList.add("none");

    foodColor = colorInputFood.value;
    headColor = colorInputHead.value;
    snakeColor = colorInputBody.value;
    tailColor = colorInputTail.value;

    c.font = "80px Arial";
    c.fillStyle = "black";
    c.textAlign = "center";
    c.fillText("Press START", gameWidth / 2, gameHeight / 2);
    if (customGamemode !== 1 && someChange) {
      creatingGamemode();
      someChange = false;
    }
  }

  inMenuOpen = false;
}

//Starting game
function gameStart() {
  if (!running && !gameOver && menuApply) {
    running = true;
    scoreText.textContent = score;
    drawFood();
    nextTick();
  }
}

//Choose difficulty in a menu
function openDifficulty() {
  DCHC.classList.add("none");
  difficultyChoose.classList.remove("none");
  inMenuOpen = true;
}
function chooseDifficulty() {
  difficultyChoose.classList.add("none");
  DCHC.classList.remove("none");
  customGamemodeP = false;
  defaultUS.checked = true;
  defaultNOF.checked = true;
  defaultSA.checked = true;
  difficultySet();
}

//Set this difficulty
function difficultySet() {
  difficultyIs = diff;
  diffChange = true;
  switch (true) {
    case difficultyIs === "superEasy":
      foodMax = 5;
      unitSize = 50;
      tickTime = 100;
      showDifficulty.innerText = `Your difficulty: 
      SUPER EASY`;
      clearTimeout(timeOut1);
      if (someChange) {
        resetGame();
      }

      break;
    case difficultyIs === "easy":
      foodMax = 3;
      unitSize = 25;
      tickTime = 75;
      showDifficulty.innerText = "Your difficulty: EASY";
      clearTimeout(timeOut1);
      if (someChange) {
        resetGame();
      }
      break;
    case difficultyIs === "medium":
      foodMax = 2;
      unitSize = 20;
      tickTime = 50;
      showDifficulty.innerText = "Your difficulty: MEDIUM";
      clearTimeout(timeOut1);
      if (someChange) {
        resetGame();
      }
      break;
    case difficultyIs === "hard":
      foodMax = 1;
      unitSize = 10;
      tickTime = 25;
      showDifficulty.innerText = "Your difficulty: HARD";
      clearTimeout(timeOut1);
      if (someChange) {
        resetGame();
      }
      break;
  }
}

//Open colors menu
function openColorsMenu() {
  DCHC.classList.add("none");
  colorMenu.classList.remove("none");
  inMenuOpen = true;
}

//Opens high score page
function highScore() {
  DCHC.classList.add("none");
  yourHighestScore.classList.remove("none");
  let hS = JSON.parse(localStorage.getItem("score")) || 0;
  highScoreShow.innerText = `Your highest score = ${hS}`;
  inMenuOpen = true;
}

//For custom gamemode
function openCustomGamemodeMenu() {
  DCHC.classList.add("none");
  createOwnGameMenu.classList.remove("none");
  inMenuOpen = true;
}
function creatingGamemode() {
  if (defaultUS.checked) {
    difficultySet();
  } else if (defaultNOF.checked) {
    difficultySet();
  } else if (defaultSA.checked) {
    difficultySet();
  }

  switch (true) {
    case US50.checked:
      unitSize = 50;
      customGamemode = true;

      break;
    case US25.checked:
      unitSize = 25;
      customGamemode = true;

      break;
    case US20.checked:
      unitSize = 20;
      customGamemode = true;

      break;
    case US10.checked:
      unitSize = 10;
      customGamemode = true;

      break;
  }

  switch (true) {
    case NOF5.checked:
      foodMax = 5;
      customGamemode = true;

      break;
    case NOF4.checked:
      foodMax = 4;
      customGamemode = true;

      break;
    case NOF3.checked:
      foodMax = 3;
      customGamemode = true;

      break;
    case NOF2.checked:
      foodMax = 2;
      customGamemode = true;

      break;
    case NOF1.checked:
      foodMax = 1;
      customGamemode = true;

      break;
  }

  switch (true) {
    case SA4.checked:
      tickTime = 25;
      customGamemode = true;

      break;
    case SA3.checked:
      tickTime = 50;
      customGamemode = true;

      break;
    case SA2.checked:
      tickTime = 75;
      customGamemode = true;

      break;
    case SA1.checked:
      tickTime = 100;
      customGamemode = true;

      break;
  }

  if (customGamemode === true) {
    clearTimeout(timeOut1);
    resetGame();
    reseted = false;
  }

  if (defaultUS.checked && defaultNOF.checked && defaultSA.checked) {
    difficultySet();
    customGamemodeP = false;
  } else {
    customGamemodeP = true;
  }
}

//Frame change
function nextTick() {
  directionChanged = false;
  if (running) {
    timeOut1 = setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, tickTime);
  } else {
    displayGameOver();
  }
}

//Fill all to green screen
function clearBoard() {
  c.fillStyle = boardBackground;
  c.fillRect(0, 0, gameWidth, gameHeight);
}

//Food
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
  snake.forEach((snakePart) => {
    if (snakePart.x === foodX && snakePart.y === foodY) {
      createFood();
    }
    if (
      (food1X === foodX && food1Y === foodY) ||
      (food2X === foodX && food2Y === foodY) ||
      (food3X === foodX && food3Y === foodY) ||
      (food4X === foodX && food4Y === foodY) ||
      (food5X === foodX && food5Y === foodY)
    ) {
      createFood();
    }
  });
}
function drawFood() {
  while (foodCreated < foodMax) {
    createFood();
    switch (true) {
      case food1X === "no" && food1Y === "no":
        food1X = foodX;
        food1Y = foodY;

        break;
      case food2X === "no" && food2Y === "no":
        food2X = foodX;
        food2Y = foodY;
        break;
      case food3X === "no" && food3Y === "no":
        food3X = foodX;
        food3Y = foodY;
        break;
      case food4X === "no" && food4Y === "no":
        food4X = foodX;
        food4Y = foodY;
        break;
      case food5X === "no" && food5Y === "no":
        food5X = foodX;
        food5Y = foodY;
        break;
    }
    foodCreated++;
  }

  c.fillStyle = foodColor;
  c.fillRect(food1X, food1Y, unitSize, unitSize);
  c.fillRect(food2X, food2Y, unitSize, unitSize);
  c.fillRect(food3X, food3Y, unitSize, unitSize);
  c.fillRect(food4X, food4Y, unitSize, unitSize);
  c.fillRect(food5X, food5Y, unitSize, unitSize);
}

//Snake move controle
function changeDirection(event, event2) {
  let keyPressed;

  if (event.keyCode === undefined) {
    keyPressed = event;
  } else {
    keyPressed = event.keyCode;
  }
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUP = ySpeed === -unitSize;
  const goingDOWN = ySpeed === unitSize;
  const goingRIGHT = xSpeed === unitSize;
  const goingLEFT = xSpeed === -unitSize;

  switch (true) {
    case keyPressed === LEFT && !goingRIGHT && !directionChanged:
      xSpeed = -unitSize;
      ySpeed = 0;
      directionChanged = true;
      break;
    case keyPressed === UP && !goingDOWN && !directionChanged:
      xSpeed = 0;
      ySpeed = -unitSize;
      directionChanged = true;
      break;
    case keyPressed === DOWN && !goingUP && !directionChanged:
      xSpeed = 0;
      ySpeed = unitSize;
      directionChanged = true;
      break;
    case keyPressed === RIGHT && !goingLEFT && !directionChanged:
      xSpeed = unitSize;
      ySpeed = 0;
      directionChanged = true;
      break;
  }
}

//Snake move
function moveSnake() {
  const head = { x: snake[0].x + xSpeed, y: snake[0].y + ySpeed };
  snake.unshift(head);
  //if food is eaten
  if ((snake[0].x === food1X) & (snake[0].y === food1Y)) {
    score += 1;
    scoreText.textContent = score;
    foodCreated--;
    food1X = "no";
    food1Y = "no";
    drawFood();
  } else if ((snake[0].x === food2X) & (snake[0].y === food2Y)) {
    score += 1;
    scoreText.textContent = score;
    foodCreated--;
    food2X = "no";
    food2Y = "no";
    drawFood();
  } else if ((snake[0].x === food3X) & (snake[0].y === food3Y)) {
    score += 1;
    scoreText.textContent = score;
    foodCreated--;
    food3X = "no";
    food3Y = "no";
    drawFood();
  } else if ((snake[0].x === food4X) & (snake[0].y === food4Y)) {
    score += 1;
    scoreText.textContent = score;
    foodCreated--;
    food4X = "no";
    food4Y = "no";
    drawFood();
  } else if ((snake[0].x === food5X) & (snake[0].y === food5Y)) {
    score += 1;
    scoreText.textContent = score;
    foodCreated--;
    food5X = "no";
    food5Y = "no";
    drawFood();
  } else {
    snake.pop();
  }
  if (JSON.parse(localStorage.getItem("score")) < score && !customGamemodeP) {
    localStorage.setItem("score", JSON.stringify(score));
  }
}
function drawSnake() {
  c.strokeStyle = snakeBorder;
  snake.forEach((snakePart, i) => {
    if (i === 0) {
      c.fillStyle = headColor;
    } else if (i === snake.length - 1) {
      c.fillStyle = tailColor;
    } else {
      c.fillStyle = snakeColor;
    }

    c.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    c.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

//Checks if you lose
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;

      break;
    case snake[0].x >= gameWidth:
      running = false;

      break;
    case snake[0].y < 0:
      running = false;

      break;
    case snake[0].y >= gameHeight:
      running = false;

      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
    }
  }
}

//For game over
function displayGameOver() {
  if (!reseted) {
    c.font = "70px Arial";
    c.fillStyle = "black";
    c.textAlign = "center";
    c.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    gameOver = true;
    running = false;
  } else {
    clearBoard();
    startPage(1);
    reseted = false;
    clearTimeout(timeOut1);
  }
}
function resetGame() {
  if (menuApply || diffChange) {
    score = 0;
    scoreText.innerText = score;
    xSpeed = unitSize;
    ySpeed = 0;
    snake = [
      { x: unitSize * 4, y: 0 },
      { x: unitSize * 3, y: 0 },
      { x: unitSize * 2, y: 0 },
      { x: unitSize, y: 0 },
      { x: 0, y: 0 },
    ];

    food1X = "no";
    food1Y = "no";
    food2X = "no";
    food2Y = "no";
    food3X = "no";
    food3Y = "no";
    food4X = "no";
    food4Y = "no";
    food5X = "no";
    food5Y = "no";

    foodCreated = 0;
    reseted = true;
    running = false;
    gameOver = false;
    diffChange = false;
    if (!customGamemode) {
      displayGameOver();
    }
    customGamemode = false;
  }
}

//For main buttons
function startResetMenu(event) {
  const keyPressed = event.keyCode;
  const startKey = 32;
  const resetKey = 82;
  const menuKey = 77;
  const applyKey = 65;

  switch (true) {
    case keyPressed === startKey:
      gameStart();
      break;
    case keyPressed === resetKey:
      resetGame();
      break;
    case keyPressed === menuKey:
      doOpenMenu();
      break;
    case keyPressed === applyKey:
      startPage();
      break;
  }
}

/*let swipeStartX;
let swipeStartY;
let swipeEndX;
let swipeEndY;

gameBoard.addEventListener("touchstart", function (e) {
  console.log(e);
  (swipeStartX = e.pageX - e.target.offsetLeft),
    (swipeStartY = e.pageY - e.target.offsetTop);
});
gameBoard.addEventListener("touchend", (e) => {
  swipeEndX = e.pageX - e.target.offsetLeft;
  swipeEndY = e.pageY - e.target.offsetTop;
  swipe();
});

function swipe() {
  console.log(
    swipeStartX + " " + swipeStartY + " " + swipeEndX + " " + swipeEndY
  );
}

gameBoard.addEventListener("mouseup", function (e) {
  console.log(e);
  let xMouse = e.pageX - e.target.offsetLeft,
    yMouse = e.pageY - e.target.offsetTop;
});*/
