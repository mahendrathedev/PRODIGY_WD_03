const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Function to create cells
function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cell);
}

// Function to handle cell clicks
function handleCellClick(index) {
    if (gameState[index] || !isGameActive) return;

    gameState[index] = currentPlayer;
    updateCell(index);
    checkWin();
}

// Function to update cell with animation
function updateCell(index) {
    const cells = document.querySelectorAll('.cell');
    cells[index].innerText = currentPlayer;

    // Adding animation class
    cells[index].classList.add('animate');

    // Remove the animation class after the animation is completed
    setTimeout(() => {
        cells[index].classList.remove('animate');
    }, 300);
}

// Function to check for a win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            message.innerText = `${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }
    }

    if (!gameState.includes('')) {
        message.innerText = "It's a draw!";
        isGameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to restart the game
function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.innerText = '';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => (cell.innerText = ''));
    currentPlayer = 'X';
}

// Create cells for the board
for (let i = 0; i < 9; i++) {
    createCell(i);
}

// Add restart functionality
restartButton.addEventListener('click', restartGame);
