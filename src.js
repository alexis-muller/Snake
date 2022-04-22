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

function createGame() {
  clearScreen();
  moveSnake();
  createSnake();

  //Creates the game tick based on speed I set
  setTimeout(createGame, 1000 / speed);
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
    ySpeed = 0;
    xSpeed = -1;
  }
  //This makes the snake move to the right
  if (event.keyCode == 39) {
    ySpeed = 0;
    xSpeed = 1;
  }
  //This makes the snake up
  if (event.keyCode == 38) {
    ySpeed = -1;
    xSpeed = 0;
  }
  //This makes the snake move down
  if (event.keyCode == 40) {
    ySpeed = 1;
    xSpeed = 0;
  }
}

createGame();
