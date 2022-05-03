import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useActivePlanet } from '../../hooks/useActivePlanet';
import { usePlanets } from '../../hooks/usePlanets';
import Scene from '../Scene';
import HeaderLink from './HeaderLink';

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { planets } = usePlanets();
  const { activePlanet, setActivePlanet } = useActivePlanet();

  useEffect(() => {
    if (pathname.includes('planets') && pathname.match(/planets\/(.+)/)) {
      const planetName = pathname.match(/planets\/(.+)/)[1];
      const planet = planets.find((planet) => planet.name === planetName);
      setActivePlanet(planet);
    }
  }, [pathname, planets]);

  useEffect(() => {
    if (activePlanet) {
      navigate('planets/' + activePlanet.name);
    }
  }, [activePlanet]);

  return (
    <>
      <Scene />
      <main className="layout">
        <header className="app-navbar">
          <div className="container container_app-navbar">
            <div className="app-navbar_left">Now in space</div>
            <nav className="app-navbar_center nav">
              <HeaderLink to="/missions">Missions</HeaderLink>
              <HeaderLink to="/planets">Planets</HeaderLink>
            </nav>
            <div className="app-navbar_rigth">Search</div>
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}
