import {useState, useEffect} from 'react';
import './TicTacToe3Marks.css';

function TicTacToeLimited() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [xMoves, setXMoves] = useState([]);
    const [oMoves, setOMoves] = useState([]);
    const [winner, setWinner] = useState(null);
    const [fadedCells, setFadedCells] = useState(Array(9).fill(null));

    useEffect(() => {
        const checkWinner = (moves) => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            return lines.some(line => line.every(i => moves.includes(i)));
        };

        if (xMoves.length >= 3 && checkWinner(xMoves)) {
            setWinner('X');
        } else if (oMoves.length >= 3 && checkWinner(oMoves)) {
            setWinner('O');
        } else if (board.every(cell => cell !== null) && !winner) {
            setWinner('Tie');
        }
    }, [board, xMoves, oMoves, winner]);

    const handleClick = (index) => {
        if (winner || board[index]) {
            return;
        }

        const newBoard = [...board];
        const newXMoves = [...xMoves];
        const newOMoves = [...oMoves];
        const newFadedCells = {...fadedCells};

        if (currentPlayer === 'X') {
            for (let i = 0; i < 9; i++) {
                if (board[i] === 'faded_X') {
                    newBoard[i] = null;
                    newFadedCells[i] = null;
                }
            }
            newBoard[index] = 'X';
            newXMoves.push(index);
            setXMoves(newXMoves);
            if (newOMoves.length === 3) {
                const oldestMove = newOMoves.shift();
                setOMoves(newOMoves);
                newBoard[oldestMove] = 'faded_O';
                newFadedCells[oldestMove] = 'O';
            }
            setCurrentPlayer('O');
        } else {
            for (let i = 0; i < 9; i++) {
                if (board[i] === 'faded_O') {
                    newBoard[i] = null;
                    newFadedCells[i] = null;
                }
            }
            newBoard[index] = 'O';
            newOMoves.push(index);
            setOMoves(newOMoves);
            if (newXMoves.length === 3) {
                const oldestMove = newXMoves.shift();
                setXMoves(newXMoves);
                newBoard[oldestMove] = 'faded_X';
                newFadedCells[oldestMove] = 'X';
            }
            setCurrentPlayer('X');
        }

        setBoard(newBoard);
        setFadedCells(newFadedCells);
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setXMoves([]);
        setOMoves([]);
        setWinner(null);
        setFadedCells({});
    };

    const renderSquare = (index) => (
        <button
            className={`square ${fadedCells[index] ? 'faded' : ''}`}
            onClick={() => handleClick(index)}
            disabled={winner || board[index] === 'faded_X' || board[index] === 'faded_O'}
        >
            {board[index] === 'X' && <span className="x">X</span>}
            {board[index] === 'O' && <span className="o">O</span>}
            {board[index] === 'faded_X' && <span className="faded-x">X</span>}
            {board[index] === 'faded_O' && <span className="faded-o">O</span>}
            {board[index] === null && <span>&nbsp;</span>}
        </button>
    );

    return (
        <div className="game">
            <div className="game-board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <div className="game-info">
                {winner ? (
                    <div>
                      <div className="winner">{winner === 'Tie' ? 'It\'s a Tie!' : `Winner: ${winner}`}</div>
                      <button onClick={handleReset}>Reset Game</button>
                    </div>
                ) : (
                    <div className="status">Current player: {currentPlayer}</div>
                )}
            </div>
        </div>
    );
}

export default TicTacToeLimited;
