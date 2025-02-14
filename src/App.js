// src/App.js
import React, { useState } from 'react';

function Square({ value, onClick, isWinner, isGameOver }) {
  return (
    <button
      className={`w-20 h-20 border-2 border-gray-300 flex items-center justify-center text-4xl font-bold transition-all
        ${isWinner ? 'bg-green-200 border-green-500' : ''}
        ${!isGameOver ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'}
        ${value === 'X' ? 'text-red-500' : 'text-blue-500'}
        ${value && !isWinner ? 'scale-110' : ''}`}
      onClick={onClick}
      disabled={isGameOver}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const isGameOver = winner || isDraw;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} Wins! 🎉`;
    if (isDraw) return "Game Drawn! 🤝";
    return `Next Player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
      <h2 className={`mb-6 text-3xl font-semibold transition-colors
        ${winner ? 'text-green-600' : ''}
        ${isDraw ? 'text-yellow-600' : 'text-gray-700'}`}>
        {getStatusMessage()}
      </h2>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinner={line.includes(index)}
            isGameOver={isGameOver}
          />
        ))}
      </div>

      <button
        className={`px-6 py-3 text-lg font-semibold text-white rounded-lg transition-colors shadow-md
          ${isGameOver ? 'bg-purple-500 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={resetGame}
      >
        {isGameOver ? 'Play Again' : 'Reset Game'}
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <Board />
    </div>
  );
}

export default App;