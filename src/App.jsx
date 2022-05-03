import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout';
import PlanetsLayout from './components/UI/PlanetsLayout';
import PlanetPage from './pages/PlanetPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="planets" element={<PlanetsLayout />}>
            <Route path="Sun" element={<PlanetPage />} />
            <Route path="Mercury" element={<PlanetPage />} />
            <Route path="Venus" element={<PlanetPage />} />
            <Route path="Earth" element={<PlanetPage />} />
            <Route path="Moon" element={<PlanetPage />} />
            <Route path="Mars" element={<PlanetPage />} />
            <Route path="Jupiter" element={<PlanetPage />} />
            <Route path="Saturn" element={<PlanetPage />} />
            <Route path="Uranus" element={<PlanetPage />} />
            <Route path="Neptune" element={<PlanetPage />} />
            <Route path="Pluto" element={<PlanetPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
