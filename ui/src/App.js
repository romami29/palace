import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import AgendaPage from "./components/AgendaPage";
import ReservationPage from "./components/ReservationPage";
import MerchPage from "./components/MerchPage";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
