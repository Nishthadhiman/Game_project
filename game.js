// game.js

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let snake = [
    {x: 50, y: 50},
    {x: 40, y: 50},
    {x: 30, y: 50}
];
let food = {x: 80, y: 80};
let dx = 10;
let dy = 0;
let score = 0;

// Game update function
function updateGame() {
    if (isGameOver()) {
        alert("Game Over! Your score is " + score);
        document.location.reload();
    } else {
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFood();
        checkFoodCollision();
        updateScore();
    }
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

// Draw the snake
function drawSnake() {
    snake.forEach(function(segment) {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Check if snake eats food
function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        snake.push({x: food.x, y: food.y});
        food.x = Math.floor(Math.random() * canvas.width / 10) * 10;
        food.y = Math.floor(Math.random() * canvas.height / 10) * 10;
    }
}

// Update the score
function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

// Check if the game is over
function isGameOver() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Handle keyboard input
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -10;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = 10;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -10;
        dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = 10;
        dy = 0;
    }
});

// Call update function every 100ms
setInterval(updateGame, 100);