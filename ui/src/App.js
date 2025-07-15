import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import AgendaPage from "./components/AgendaPage";
import ReservationPage from "./components/ReservationPage";
import MerchPage from "./components/MerchPage";
import LoginPage from "./components/LoginPage";
import BasketPage from "./components/BasketPage";
import ThemeEditor from "./components/ThemeEditor";

const App = () => {
  return (
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/merch" element={<MerchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/theme" element={<ThemeEditor />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
