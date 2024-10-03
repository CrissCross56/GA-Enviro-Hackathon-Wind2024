import { Route, Routes } from "react-router-dom";
import OpenWeatherPage from './pages/OpenWeatherPage/OpenWeatherPage'
import "./App.css";
import GeoLocationTest from "./components/GeoLocationTest";
import LoginPage from "./pages/LoginPage/LoginPage";
import AQIComponent from "./components/AQIComponent/AQIComponent";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/openweather" element={<OpenWeatherPage />} />
    </Routes>
    {/* <GeoLocationTest/> */}
    {/* <AQIComponent /> */}

    </div>
  );
}

export default App;
