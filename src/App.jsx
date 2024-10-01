import { Route, Routes } from "react-router-dom";
import OpenWeatherPage from './pages/OpenWeatherPage/OpenWeatherPage'
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/openweather" element={<OpenWeatherPage />} />
    </Routes>
  );
}

export default App;
