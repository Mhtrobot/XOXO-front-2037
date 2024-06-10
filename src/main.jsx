import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import Game from "./components/Game.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" index element={<App />} />
              <Route path="/login" index element={<LoginPage />} />
              <Route path="/games" index element={<Game />} />
              <Route path="/games/score-board" index element={<ScoreBoard />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
