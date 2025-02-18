import { memo, useCallback, useEffect } from "react";
import "./SolarSystem.css";

const planets = [
    { name: "Mercury", size: 5, orbit: 5, audio: "mercury.mp3" },
    { name: "Venus", size: 5.5, orbit: 8, audio: "venus.mp3" },
    { name: "Earth", size: 6, orbit: 11, audio: "earth.mp3" },
    { name: "Mars", size: 6.8, orbit: 14, audio: "mars.mp3" },
    { name: "Jupiter", size: 7.5, orbit: 16, audio: "jupiter.mp3" },
    { name: "Saturn", size: 7, orbit: 18, audio: "saturn.mp3" },
    { name: "Uranus", size: 6.5, orbit: 20, audio: "uranus.mp3" },
    { name: "Neptune", size: 8.2, orbit: 23, audio: "neptune.mp3" },
  ];

const Planet = memo(({ name, size, orbit, handlePlaySound }: { handlePlaySound: (arg: string) => void; name: string; size: number; orbit: number; audio: string }) => {
    const handler = useCallback(() => {
        console.log(name);
        handlePlaySound(name);
    }, [handlePlaySound, name]);

    useEffect(() => {
        document.body.setAttribute('class', 'dark-blue');

        return () => {document.body.removeAttribute('class')}
    }, []);
 
  return (
    <div
        translate="no"
        key={name}
        className="orbit"
        style={{ "--orbit-size": `${orbit * 2}rem` } as React.CSSProperties}>
        <img
            onClick={handler}
            className="planet"
            src={`${import.meta.env.BASE_URL}planets/images/${name.toLocaleLowerCase()}.png`}
            style={{
                width: `${size}rem`,
                height: 'auto',
                "--planet-distance": `${orbit}rem`,
                "--orbit-speed": `${Math.sqrt(orbit) * 12}s`,
                zIndex: 1
            } as React.CSSProperties}
        />
    </div>
  );
});

const SolarSystem = ({ handlePlaySound }: {handlePlaySound: (arg: string) => void}) => {
  return (
    <div className="solar-system" translate="no">
      <img
        translate="no"
        className="sun" src={`${import.meta.env.BASE_URL}planets/images/sun.png`}
         onClick={() => handlePlaySound('sun')}   
        />
      {planets.map((planet) => {
        return (
            <Planet key={planet.name} handlePlaySound={handlePlaySound} {...planet} />
          )
      })}
    </div>
  );
};

export default memo(SolarSystem);