import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" index element={<App />} />
              <Route path="/login" index element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
