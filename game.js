const gameContainer = document.querySelector("#gameContainer");
const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const scoreBox = document.querySelector("#score");

// On start button press
const startBtn = document.querySelector("#start-btn");
const menu = document.querySelector("#menu");

startBtn.addEventListener("click", () => {
  menu.style.scale = "0%";
  menu.style.opacity = 0;
  menu.style.pointerEvents = "none";
  gameContainer.style.scale = "100%";
  gameContainer.style.opacity = "100%";
  gameContainer.style.pointerEvents = "default";
  startGame();
});

const paintBackground = () => {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const gridSize = 20;

const snake = [
  { x: 10 * gridSize, y: 10 * gridSize },
  { x: 9 * gridSize, y: 10 * gridSize },
  { x: 8 * gridSize, y: 10 * gridSize },
];

let gameInterval = null;
let targetX;
let targetY;
let velocityX = gridSize;
let velocityY = 0;
let score = 0;

const createTarget = () => {
  targetX = 20 * Math.floor(10 * Math.random());
  targetY = 20 * Math.floor(10 * Math.random());

  snake.forEach((segment, i) => {
    while (targetX === segment.x && targetY === segment.y) {
      createTarget();
    }
  });
};

const draw = () => {
  paintBackground();
  ctx.fillStyle = "green";
  ctx.fillRect(targetX, targetY, gridSize, gridSize);
  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "brown" : "lime";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
};

window.addEventListener("keypress", (e) => {
  if (e.key === "w" && velocityY !== gridSize) {
    velocityY = -gridSize;
    velocityX = 0;
  } else if (e.key === "s" && velocityY !== -gridSize) {
    velocityY = gridSize;
    velocityX = 0;
  } else if (e.key === "a" && velocityX !== gridSize) {
    velocityX = -gridSize;
    velocityY = 0;
  } else if (e.key === "d" && velocityX !== -gridSize) {
    velocityX = gridSize;
    velocityY = 0;
  }
});

createTarget();

const checkBorderCollision = () => {
  return snake[0].x < 0 ||
    snake[0].x >= 400 ||
    snake[0].y < 0 ||
    snake[0].y >= 400
    ? true
    : false;
};

const checkSnakeCollision = () => {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }

  return false;
};

const checkIsGameOver = () => {
  if (checkBorderCollision() || checkSnakeCollision()) {
    clearInterval(gameInterval);
  }
};

const startGame = () => {
  if (gameInterval !== null) {
    clearInterval(gameInterval);
  }

  gameInterval = setInterval(() => {
    checkIsGameOver();

    snake.unshift({ x: snake[0].x + velocityX, y: snake[0].y + velocityY });
    if (snake[0].x === targetX && snake[0].y === targetY) {
      score += 5;
      scoreBox.textContent = score;
      createTarget();
    } else {
      snake.pop();
    }

    draw();
  }, 100);
};
