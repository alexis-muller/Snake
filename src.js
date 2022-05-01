//This grabs the canvas board from html
const gameBoard = document.getElementById("gameBoard");
const gameRender = gameBoard.getContext("2d");

let speed = 12;
let xSpeed = 0;
let ySpeed = 0;
//The size of the snake head
let squareCount = 30;
//600 divided by 30-1
let squareSize = gameBoard.width / squareCount - 1;
let snakeHeadX = 10;
let snakeHeadY = 10;

let appleX = 5;
let appleY = 5;

function createGame() {
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();
  appleCollision();
  moveSnake();
  createSnake();
  createApple();

  //Creates the game tick based on speed I set
  setTimeout(createGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (snakeHeadX < 0) {
    gameOver = true;
  }
  if (snakeHeadX >= squareCount - 10) {
    gameOver = true;
  }
  if (snakeHeadY < 0) {
    gameOver = true;
  }
  if (snakeHeadY >= squareCount - 10) {
    gameOver = true;
  }

  if (gameOver) {
    gameRender.fillStyle = "red";
    gameRender.font = "30px helvetica";
    gameRender.fillText(
      "Game Over",
      gameBoard.width - 350,
      gameBoard.height - 300
    );
  }
  return gameOver;
}

function createSnake() {
  gameRender.fillStyle = " red ";
  //Creates the head of snake based on x, y positoin and squareSize width and height
  gameRender.fillRect(
    snakeHeadX * squareCount,
    snakeHeadY * squareCount,
    squareSize,
    squareSize
  );
}

function createApple() {
  gameRender.fillStyle = "green";
  gameRender.fillRect(
    appleX * squareCount,
    appleY * squareCount,
    squareSize,
    squareSize
  );
}

function appleCollision() {
  if (appleX === snakeHeadX && appleY === snakeHeadY) {
    //This makes the apple appear at a random place on gameboard
    appleX = Math.floor(Math.random() * 20);
    appleY = Math.floor(Math.random() * 20);
  }
}

function moveSnake() {
  snakeHeadX = snakeHeadX + xSpeed;
  snakeHeadY = snakeHeadY + ySpeed;
}

function clearScreen() {
  gameRender.fillStyle = "black";
  //Creates the black game board and starts it from top left corner
  gameRender.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

document.body.addEventListener("keydown", logKey);

function logKey(event) {
  //This makes the snake move to the left
  if (event.keyCode == 37) {
    if (xSpeed == 1) {
      return;
    }
    ySpeed = 0;
    xSpeed = -1;
  }
  //This makes the snake move to the right
  if (event.keyCode == 39) {
    if (xSpeed == -1) {
      return;
    }
    ySpeed = 0;
    xSpeed = 1;
  }
  //This makes the snake up
  if (event.keyCode == 38) {
    if (ySpeed == 1) {
      return;
    }
    ySpeed = -1;
    xSpeed = 0;
  }
  //This makes the snake move down
  if (event.keyCode == 40) {
    if (ySpeed == -1) {
      return;
    }
    ySpeed = 1;
    xSpeed = 0;
  }
}

createGame();
