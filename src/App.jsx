import { Route, Routes } from "react-router-dom";
import OpenWeatherPage from './pages/OpenWeatherPage/OpenWeatherPage'
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";

import HomePage from "./pages/HomePage/HomePage"


function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/openweather" element={<OpenWeatherPage />} />
    </Routes>

    </div>
  );
}

export default App;
