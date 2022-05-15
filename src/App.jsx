import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout';
import PlanetsLayout from './components/UI/PlanetsLayout';
import AboutPage from './pages/AboutPage';
import PlanetPage from './pages/PlanetPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="planets" element={<PlanetsLayout />}>
            <Route path=":planetId" element={<PlanetPage />} />
          </Route>
        </Route>
        <Route path="about-us" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
