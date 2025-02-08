import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home.jsx";
import "./App.css";
import ShowAns from "./Component/ShowAns.jsx";
import Loging from "./Component/Loging.jsx";
import Quize from "./Component/Quize.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ShowAns" element={<ShowAns />} />
        <Route path="/Loging" element={<Loging />} />
        <Route path="/Quize" element={<Quize />} />
      </Routes>
    </Router>
  );
}

export default App;
