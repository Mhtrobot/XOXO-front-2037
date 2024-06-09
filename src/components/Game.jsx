import {useLocation} from "react-router-dom";

const Game = () => {
  const location = useLocation();
  const {user1, user2} = location.state;
  return <div>player one: {user1}, player two: {user2}</div>
}

export default Game;