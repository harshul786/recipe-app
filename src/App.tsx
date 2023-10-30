import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
