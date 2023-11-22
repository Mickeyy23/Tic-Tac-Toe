document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameEnded = false;
    const cells = Array.from(document.querySelectorAll('.cell'));

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

   
    const boardState = ['','','','','','','','',''];

   
    function handleClick(event) {
      const cell = event.target;
      const index = cells.indexOf(cell);

      if (gameEnded || boardState[index] !== '') return;

      boardState[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin(currentPlayer)) {
        message.textContent = `Player ( Играч )${currentPlayer} wins( Победува )!`;
        gameEnded = true;
      } else if (isBoardFull()) {
        message.textContent = "It's a tie!";
        gameEnded = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player( Играч ) ${currentPlayer}'s turn( Врти )`;
      }
    }

    function checkWin(player) {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return boardState[index] === player;
        });
      });
    }

    function isBoardFull() {
      return boardState.every(cell => cell !== '');
    }

    function restartGame() {
      currentPlayer = 'X';
      gameEnded = false;
      boardState.fill('');
      cells.forEach(cell => {
        cell.textContent = '';
      });
      message.textContent = `Player( Играч ) ${currentPlayer}'s turn( Врти )`;
    }

    cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });

    restartButton.addEventListener('click', restartGame);

    message.textContent = `Player( Играч ) ${currentPlayer}'s turn( Врти )`;
  });