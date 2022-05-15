import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import { useActivePlanet } from '../../hooks/useActivePlanet';
import { usePlanets } from '../../hooks/usePlanets';
import Scene from '../Scene';
import AboutPageLink from './AboutPageLink';
import HeaderLink from './HeaderLink';
import ObserveLink from './ObserveLink';

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { planets } = usePlanets();
  const { activePlanet, setActivePlanet, observeMode, setObserveMode } =
    useActivePlanet();

  useEffect(() => {
    if (pathname.includes('planets') && pathname.match(/planets\/(.+)/)) {
      const planetName = pathname.match(/planets\/(.+)/)[1];
      const planet = planets.find((planet) => planet.name === planetName);
      setActivePlanet(planet);
    } else {
      setActivePlanet(null);
    }
  }, [pathname, planets]);

  useEffect(() => {
    if (activePlanet) {
      navigate('planets/' + activePlanet.name);
    }
  }, [activePlanet]);

  const handleObserve = () => {
    setObserveMode(!observeMode);
  };

  return (
    <>
      <Scene />
      <main className="layout">
        <header className="app-navbar">
          <div className="container container_app-navbar">
            <div className="app-navbar_left">
              <Link to="/" className="app-navbar_logo">
                <img src={Logo} />
              </Link>
            </div>
            <nav className="app-navbar_center nav">
              <HeaderLink to="/missions">Missions</HeaderLink>
              <HeaderLink to="/planets">Planets</HeaderLink>
            </nav>
            <div className="app-navbar_rigth" onClick={handleObserve}>
              {activePlanet ? <ObserveLink /> : <AboutPageLink />}
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}
