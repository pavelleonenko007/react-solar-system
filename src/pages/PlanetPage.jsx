import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const BulletItem = ({ title, value }) => (
  <div className="bullets_item bullet">
    <div className="bullet_value">{value}</div>
    <div className="bullet_title">{title}</div>
  </div>
);

export default function PlanetPage() {
  const { planetId } = useParams();
  const bullets = useRef([]);
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    fetch('../data/mock.json')
      .then((response) => response.json())
      .then((data) => {
        setPlanet(data.find((planet) => planet.id === planetId));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="container">
      <div className="planet">
        <div className="planet_wrapper">
          <h1 className="planet_title">{planet.name}</h1>
          <div
            className="planet_description"
            dangerouslySetInnerHTML={{ __html: planet.description }}
          ></div>
          <div className="planet_bullets bullets">
            {planet.bullets &&
              planet.bullets.map((bullet, index) => (
                <BulletItem
                  key={index}
                  title={bullet.title}
                  value={bullet.value}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
