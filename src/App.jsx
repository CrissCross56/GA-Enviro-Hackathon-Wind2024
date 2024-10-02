import { Route, Routes } from "react-router-dom";
import "./App.css";
import GeoLocationTest from "./components/GeoLocationTest";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <GeoLocationTest/>

    </div>
  );
}

export default App;
