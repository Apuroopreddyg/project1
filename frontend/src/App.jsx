import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Completion from "./components/Completion";
import Finished from "./components/Finished";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/finished" element={<Finished />} />
      </Routes>
    </Router>
  );
};

export default App;
