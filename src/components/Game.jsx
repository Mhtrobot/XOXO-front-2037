import {useLocation} from "react-router-dom";
import HeaderPage from "./HeaderPage.jsx";
import FooterPage from "./FooterPage.jsx";
import GameBoard from "./GameBoard.jsx";
import {useState} from "react";
import axios from "axios";
const Game = () => {
  const location = useLocation();
  const {user1, user2} = location.state;

    function Sqaure({value, onClick}){
        return <button className={'square'} onClick={onClick}>{value}</button>
    }

    function Board(){
        const [squares, setSquares] = useState(Array(9).fill(null));
        const [isXnext, setIsXnext] = useState(true);

        const handleClick = (index) => {
            const newSquare = squares.slice();
            if (calculateWinner(squares) || squares[index])
                return;

            newSquare[index] = isXnext ? 'X' : 'O';
            setSquares(newSquare)
            setIsXnext(!isXnext)
        }

        const renderSquare = (index)=>(
            <Sqaure value={squares[index]} onClick={()=>handleClick(index)} />
        );

        const winner = calculateWinner(squares);

        const sendResultsToServer = async (winner)=>{
            const user1Status = winner === 'X' ? 'WIN' : 'LOSE';
            const user2Status = winner === 'X' ? 'WIN' : 'LOSE';
            const results = [
                {username: user1, status: user1Status},
                {username: user2, status: user2Status}
            ];

            try {
                await axios.post('http://127.0.0.1:8000/update_score', {username: user1, status: user1Status})
                await axios.post('http://127.0.0.1:8000/update_score', {username: user2, status: user2Status})
            }catch (error) {
                console.log('Error sending results to the server: ', error)
            }
        }
        let status;
        if (winner){
            status = `Winner: ${winner}`;
            alert(status)
            sendResultsToServer(status)
        }else
            status = `Next Player: ${isXnext? 'X' : 'O'}`;

        return (
            <div>
                <div className="status">{status}</div>
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
        );
    }

    function calculateWinner(sqaures){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i=0; i<lines.length; i++){
            const [a,b,c] = lines[i];
            if (sqaures[a] && sqaures[a]===sqaures[b] && sqaures[a] === sqaures[c])
                return sqaures[a]
        }

        return null;
    }

    return (
        <>
            <HeaderPage/>
            <div className={'stats'}>
                <p>X is: {user1}</p>
                <p>O is: {user2}</p>
            </div>
            <div className="game-board">
                <Board />
            </div>
            <FooterPage/>
        </>
    )
}

export default Game;