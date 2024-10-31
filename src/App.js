import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];


const App = () => {
  
  const [turn, setTurn] = useState('X');
  const [winningSquares, setWinningSquares] = useState([]);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [score, setScore] = useState({
      X: 0,
      O: 0,
  });

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }
  
const checkForWinner = newSquares => {
  
  for(let i = 0; i < winningPositions.length; i++){
    const [a, b, c] = winningPositions[i];
    if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]){
      //Hay un ganador
      endGame(newSquares[a], winningPositions[i]);
      return
      
    }
  }

  if(!newSquares.includes(null)){
    //hay un empate
    endGame(null, Array.from(Array(10).keys()));
    return
  }
  setTurn(turn === 'X' ? 'O' : 'X');
}


const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
} 
  
const endGame = (result, winningPositions) =>{
    setTurn(null); //Bloqueamos los clicks del usuario cuando el espacio para jugar queda nullo
    if(result !== null){
      setScore({
        ...score,
        [result] : score[result] + 1,
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 4000);
    
}

return (
    <div className="container">
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
