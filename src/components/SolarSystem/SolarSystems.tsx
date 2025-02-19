import { memo, MouseEventHandler, useCallback, useEffect } from "react";
import "./SolarSystem.css";

type Planet = {
    name: string;
    size: number;
    orbit: number;
    audio: string;
    satellites?: Planet[]
}

const planets: Planet[] = [
    { name: "Mercury", size: 6, orbit: 7, audio: "mercury.mp3" },
    { name: "Venus", size: 6.5, orbit: 10, audio: "venus.mp3" },
    { name: "Earth", size: 7, orbit: 13, audio: "earth.mp3", satellites: [{
        name: "Moon", size: 4, orbit: 5, audio: "moon.mp3"
    }] },
    { name: "Mars", size: 7.8, orbit: 16, audio: "mars.mp3" },
    { name: "Jupiter", size: 10.5, orbit: 19, audio: "jupiter.mp3" },
    { name: "Saturn", size: 8, orbit: 22, audio: "saturn.mp3" },
    { name: "Uranus", size: 7.5, orbit: 25, audio: "uranus.mp3" },
    { name: "Neptune", size: 9.2, orbit: 29, audio: "neptune.mp3" },
];

const Planet = memo(({ name, size, orbit, handlePlaySound, satellites = [] }: Planet & { handlePlaySound: (arg: string) => void; }) => {
    const handler = useCallback(() => {
        console.log(name);
        handlePlaySound(name);
    }, [handlePlaySound, name]);

    const handleSattelitesSound = useCallback((stteliteName: string) => (e: Event) => {
        e.stopPropagation();
        handlePlaySound(stteliteName);
    }, [handlePlaySound]);

    return (
        <div
            translate="no"
            key={name}
            className="orbit"
            style={{ "--orbit-size": `${orbit * 2}rem` } as React.CSSProperties}>
                <div
                    onClick={handler}
                    className="planet"
                    style={{
                        width: `${size}rem`,
                        height: 'auto',
                        "--planet-distance": `${orbit + 5}rem`,
                        "--orbit-speed": `${Math.sqrt(orbit) * 12}s`,
                        zIndex: 1,
                        position: 'relative'
                    } as React.CSSProperties}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}planets/images/${name.toLocaleLowerCase()}.png`}
                        style={{
                            width: `${size}rem`,
                            height: 'auto',
                        } as React.CSSProperties}
                    />
                    {satellites.map((satellite) => (
                        <div
                            translate="no"
                            key={satellite.name}
                            className="orbit satellite-orbit"
                            style={{ "--orbit-size": `${satellite.orbit * 2}rem` } as React.CSSProperties}>
                                <img
                                    onClick={handleSattelitesSound(satellite.name) as unknown as MouseEventHandler<HTMLImageElement>}
                                    className="planet satellite"
                                    src={`${import.meta.env.BASE_URL}planets/images/${satellite.name.toLocaleLowerCase()}.png`}
                                    style={{
                                        width: `${satellite.size}rem`,
                                        height: 'auto',
                                        "--planet-distance": `${satellite.orbit}rem`,
                                        "--orbit-speed": `${Math.sqrt(satellite.orbit) * 12}s`,
                                        zIndex: 1
                                    } as React.CSSProperties}
                                />
                        </div>
                    ))}
                </div>
        </div>
    );
});

const SolarSystem = ({ handlePlaySound }: { handlePlaySound: (arg: string) => void }) => {
    const handlerPlaySunSound = () => handlePlaySound('sun');

    useEffect(() => {
        document.body.style.setProperty('background-image', 'radial-gradient(circle, #9f7d9a, #0c273e)');
        return () => {
            document.body.style.setProperty('background-image', 'linear-gradient(to bottom, #6a4c93 0%, #9f6990 100%)');
        }
    }, []);

    return (
        <div className="solar-system" translate="no">
            <img
                translate="no"
                className="sun"
                src={`${import.meta.env.BASE_URL}planets/images/sun.png`}
                onClick={handlerPlaySunSound}
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