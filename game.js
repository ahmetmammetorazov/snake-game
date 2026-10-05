const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

const painBackground = () => {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const gridSize = 20;

const snake = [
  { x: 10 * gridSize, y: 10 * gridSize },
  { x: 9 * gridSize, y: 10 * gridSize },
  { x: 8 * gridSize, y: 10 * gridSize },
];

let targetX;
let targetY;
let velocityX = gridSize;
let velocityY = 0;

const createTarget = () => {
  targetX = 20 * Math.floor(10 * Math.random());
  targetY = 20 * Math.floor(10 * Math.random());
};

const draw = () => {
  painBackground();
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

setInterval(() => {
  snake.unshift({ x: snake[0].x + velocityX, y: snake[0].y + velocityY });

  if (snake[0].x === targetX && snake[0].y === targetY) {
    createTarget();
  } else {
    snake.pop();
  }

  draw();
}, 100);
