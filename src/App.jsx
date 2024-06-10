import './App.css'
import {Link} from "react-router-dom";
import HeaderPage from "./components/HeaderPage.jsx";
import FooterPage from "./components/FooterPage.jsx";

function App() {
  return (
    <>
        <HeaderPage />
        <div className="home-options">
            <Link to={"/login"} className={"home-op-start"}>START</Link>
            <br/>
            <Link to={"/games/score-board"} className={"home-op-scores"}>SCORES</Link>
        </div>
        <FooterPage />
      {/*<div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>*/}
    </>
  )
}

export default App
