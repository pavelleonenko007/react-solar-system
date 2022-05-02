import React from 'react';
import { Outlet } from 'react-router-dom';
import PlanetLink from './PlanetLink';

export default function PlanetsLayout() {
  return (
    <>
      <Outlet />
      <div className="planets-nav">
        <PlanetLink to="Sun">Sun</PlanetLink>
        <PlanetLink to="Mercury">Mercury</PlanetLink>
        <PlanetLink to="Venus">Venus</PlanetLink>
        <PlanetLink to="Earth">Earth</PlanetLink>
        <PlanetLink to="Mars">Mars</PlanetLink>
        <PlanetLink to="Jupiter">Jupiter</PlanetLink>
        <PlanetLink to="Saturn">Saturn</PlanetLink>
        <PlanetLink to="Uranus">Uranus</PlanetLink>
        <PlanetLink to="Neptune">Neptune</PlanetLink>
        <PlanetLink to="Pluto">Pluto</PlanetLink>
      </div>
    </>
  );
}
